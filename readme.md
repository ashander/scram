scram: sacramento county retriever and munger

[![NPM](https://nodei.co/npm/scram.png)](https://nodei.co/npm/scram/)

wrapping the Sacramento County Open Data api

Use:

- rename .envexample to .env and place it in the working directory where you
  will use the script
$ mv node_modules/scram/.envexample .env

- in .env, edit the line below so after the = is an API key
  obtained from http://data.saccounty.net/developers/

SAC_API_KEY=21235avalidapikey142


The module provides three functions:

 - available() :
     stream the guids available in datastreams to process.stdout
 - info(guid, infoProcessor):
     print info about a guid (or process with a custom callback function
     infoProcessor)
 - data(guid, limit=50, streamProcessor):
     stream data from guid to process.stdout (or process with a custom
     callback function streamProcessor)

Note: versions before 0.3.0 mistakenly contained an api key and have been
unpublished.
