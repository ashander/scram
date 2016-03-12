var scram = require("scram");

endpoint = process.argv[2];
jsonpath = process.argv[3];

if(typeof endpoint === "undefined") {
console.log("Usage: node scram-cli (ENDPOINT='') (JSONPATH='*')");
console.log("");
console.log("Calling without arguments will return the possible endpoints");
console.log("(last part of the URL).");
console.log("");
console.log("The JSONPATH, if provided, is used to filter the output");
console.log("");
}
console.log("Results:");
scram(endpoint, jsonpath);
