scram: sacramento county retriever and munger

wrapping the Sacramento County Open Data api

[![NPM](https://nodei.co/npm/scram.png)](https://nodei.co/npm/scram/)

Use:

- `$ npm install scram`
- visit http://data.saccounty.net/developers/ and obtain an API key

```js
var scram = import(scram)
scram.apiKey = '21235avalidapikey142' //note the quotes
//scram.resouce = 'datastreams' // the default value, but change it...

// a stream of guids
scram.available()

//stream info to stdout by default, or pass custom callback as last arg
scram.info(guid)

// stream 3 results from data to stdout by default, or pass custom callback as last arg
scram.data(guid, 3)
```


The API provides several types of resources (datastreams, datasets,
visualizations, and dashboards). By default, the only looks at datastreams.
This can be changed by modifying the `RESOURCES` variable in `.env`.

## Module

The module provides three functions:

 - available() :
     stream the guids available in datastreams to process.stdout
 - info(guid, infoProcessor):
     print info about a guid (or process with a custom callback function
     infoProcessor)
 - data(guid, limit=50, streamProcessor):
     stream data from guid to process.stdout (or process with a custom
     callback function streamProcessor)

## Command line

The module also provides a wrapper for command-line interaction, `scram-cli.js`.
It's set up to populate api key and default resource from a .env file.

### Setup

- rename .envexample to .env and place it in the working directory where you
  will use the script
```sh
$ mv node_modules/scram/.envexample .env
```

- in .env, edit the line below so after the = is the API key
  obtained from http://data.saccounty.net/developers/. Note no quotes here.

```sh
SAC_API_KEY=21235avalidapikey142
```

* Copy or simlink to the working directory by
```sh
$ ln -s node_modules/scram/scram-cli.js scram-cli
```

### Use
Interact with the api from the command line!

Print help,
```sh
$ node scram-cli -h
```
List all GUIDs in the current resource (defined in `.env`),
```sh
$ node scram-cli
```

Query info (metadata) on a GUID
```sh
$ node scram-cli info GUID
```

Stream data from a GUID
```sh
$ node scram-cli data GUID
```


## Contributing
- Fork on github ( https://github.com/ashander/scram/fork )
- Create a branch with a good name (`git checkout -b my-new-feature`)
- Commit your changes (`git commit -am 'Add some feature'`)
- Push the branch (`git push origin -u my-new-feature`)
- Create a new Pull Request on github

## Errata
Note: versions before 0.3.0 mistakenly contained an api key and have been
unpublished.
