// scram: sacramento county retriever and munger
// Wrap Sac Open Data API
//
// Exports three fuctions:
//
// - available() :
//     stream the guids available in datastreams to process.stdout
// - info(guid, infoProcessor):
//     print info about a guid (or process with a custom callback function
//     infoProcessor)
//
// - data(guid, limit =50, streamProcessor):
//     stream data from guid to process.stdout (or process with a custom
//     callback function streamProcessor)
//

var dotenv = require("dotenv").config();
var request = require("request");
var JSONStream = require("JSONStream");
var throughObj = require("through2").obj;
var concat = require("concat-stream");

var api_key = process.env.SAC_API_KEY;
var api = "http://saccounty.cloudapi.junar.com/api/v2";
var default_limit = 50;

exports = module.exports;

exports.available =  function() {
  limit = false;
  streamSomething("datastreams/", limit, listGUIDs);

  function listGUIDs(theStream) {
    theStream.on("error", handleError);
    theStream.on("response", function() {
      theStream
      .pipe(JSONStream.parse("*.guid"))
      .pipe(throughObj(function(line, _, next) {
        this.push(line + "\n");
        next();
      }))
      .pipe(process.stdout);

    });
  }

};

exports.info = function(guid, infoProcessor) {
  if(typeof infoProcessor === "undefined"){
    infoProcessor = function(info) { console.log(info);};
  }
  limit = false;
  return streamSomething("datastreams/" + guid, limit, getInfo);

  function getInfo(theStream) {

    var intoJSON= concat(function(buffer) {
      infoProcessor(JSON.parse(buffer));
    });

    theStream
    .on("error", handleError)
    .pipe(intoJSON);
  }
};

exports.data = function(guid, limit, streamProcessor) {
  if (typeof streamProcessor === "undefined") {
    if (typeof limit === "undefined") {
      streamProcessor = defaultStreamProcessor;
      limit = default_limit;
    } else if (typeof limit === "function") {
      streamProcessor = limit;
    } else if (typeof limit === "number") {
      streamProcessor = defaultStreamProcessor;
    }
  }
  return streamSomething("datastreams/" + guid + "/data.json/",
                         limit, streamProcessor);
};

function defaultStreamProcessor(theStream) {
        theStream.pipe(process.stdout);
        //.pipe(JSONStream.parse("*"))
      }

function streamSomething(endpoint, limit, callback) {
  if (typeof limit === "undefined") {
    limit = default_limit;
  }
  var theStream = sacApiRequest(endpoint, limit); //fakeSac(endpoint);

  return callback(theStream);
}

function sacApiRequest(endpoint, limit) {
  //Details from http://data.saccounty.net/developers/
  //
  // A typical request will look like this:
  //
  // http://saccounty.cloudapi.junar.com/api/v2/datastreams/SACRA-COUNT-CALIF-QUICK-FACTS/data.json/?auth_key=YOUR_API_KEY
  //
  // A few things to note in the request above: /api/v2/datastreams/ This is an
  // invoke request, that will return a json response. The entire resources
  // descriptions are available in the API resource documentation.
  // SACRA-COUNT-CALIF-QUICK-FACTS This is the GUID of the data stream you are
  // accessing. You will always find this GUID in the Data Stream Details page,
  // making a data stream search through the API, or in many other places.
  // auth_key=YOUR_API_KEY This is the key from step 1. You"ll need it for every
  // request.
  //
  // Your response will be returned as JSON.
  // You can also obtain the response in XML, CSV and HTML.
  //
  // http://api-en.readthedocs.org/en/latest/
  var opts = {
    baseUrl: api,
    method: "GET",
    qs: {"auth_key": api_key}
  };
  if(limit) {
    opts.qs.limit = limit;
  }
  //  console.log(opts);
  var r = request(endpoint, opts);
  return r;
}

function handleError(err) {
  // handle your error appropriately here, e.g.:
  console.error(err);// print the error to STDERR
  process.exit(1);// exit program with non-zero exit cod
}
