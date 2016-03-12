// http://data.saccounty.net/developers/
//A typical request will look like this:
//http://saccounty.cloudapi.junar.com/api/v2/datastreams/SACRA-COUNT-CALIF-QUICK-FACTS/data.json/?auth_key=YOUR_API_KEY
//A few things to note in the request above: /api/v2/datastreams/ This is an
//invoke request, that will return a json response. The entire resources
//descriptions are available in the API resource documentation.
//SACRA-COUNT-CALIF-QUICK-FACTS This is the GUID of the data stream you are
//accessing. You will always find this GUID in the Data Stream Details page,
//making a data stream search through the API, or in many other places.
//auth_key=YOUR_API_KEY This is the key from step 1. You"ll need it for every
//request.
//
// Your response will be returned as JSON.
// You can also obtain the response in XML, CSV and HTML..
//
// http://api-en.readthedocs.org/en/latest/
//fs.readFileSync("sac_api.key", "utf8").trim();

var dotenv = require("dotenv").config();
var fs = require("fs");
var request = require("request");
var prompt = require("prompt");
var JSONStream = require("JSONStream");
var throughObj = require("through2").obj;
var concat = require("concat-stream");

var api_key = process.env.SAC_API_KEY;
var api = "http://saccounty.cloudapi.junar.com/api/v2";



module.exports =  function(category, jsonQuery) {
  if (typeof jsonQuery === "undefined") {
    jsonQuery =  "*";
  }
  if (typeof category === "undefined") {
    category = "";
  }
  hitSac(category, "yo", jsonQuery);
};


//with request
function getSac(endpoint) {
  var opts = {
    baseUrl: api,
    method: "GET",
    qs: {auth_key: api_key}
  };
//  console.log(opts);
  var r = request(endpoint, opts);
  return r;
}

function hitSac(endpoint, prompt_choice, jsonQuery) {
  var eventToPipe = "response"; //"open" // for fake sack
  var menu;

  var input = getSac(endpoint); //fakeSac(endpoint);

  input.on("error", handleError);
  input.on(eventToPipe, goIn);

  function echoResult(err, result){
    console.log(result);
  }
  function topLevel(){
    var listMenu = concat(listKeys);
    input.pipe(listMenu).on("finish", function(err, echoResult){
      console.log(prompt_choice);
      prompt.get("choice", function(err, result) {
        console.log("You chose \'" + result.choice + "\'");
        //        echoResult(null, result.choice);
      });} );
  }

  function goIn(){
    //    var listMenu = concat(listKeys);
    //  input.on("error",  function(err) {console.log(err)})
    input
    .pipe(JSONStream.parse(jsonQuery))
    .pipe(throughObj(function(line, _, next) {
      this.push(JSON.stringify(line) + "\n");
      next();
    }))
    .pipe(process.stdout);
    //	    .on("data", function (chunk) {
    //		    console.log(JSON.stringify(chunk));
    //	    });
    /////////////////////////cruft in this function
    //
    //.pipe(fs.createWriteStream(category + ".json"))
    //    .pipe(JSONStream.stringify())

    //	    .pipe(listMenu)
    //	    .on("finish", function(err, echoResult){
    //      console.log(prompt_choice);
    //      prompt.get("choice", function(err, result) {
    //        console.log("You chose \'" + result.choice + "\'");
    //        echoResult(null, result.choice);
    //      });} );
  }

  //
  //.pipe(fs.createWriteStream("top_level.json"))
  //  .on("end", function() {
  //      //done
  //   })
  //console.log(r)
}

function fakeSac(endpoint){
  var fakeSac = fs.createReadStream(category + ".json");
  return fakeSac;
}

function listKeys(menu) {
  menu = JSON.parse(menu);
  var ctr = 0;
  for(var key in menu){
    console.log(++ctr +") "+ key);
  }
}
function handleError(err) {
  // handle your error appropriately here, e.g.:
  console.error(err);// print the error to STDERR
  process.exit(1);// exit program with non-zero exit cod
}
