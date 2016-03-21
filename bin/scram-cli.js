#! /usr/bin/env node
var scram = require('../index.js')
var dotenv = require('dotenv')
dotenv.config()
scram.apiKey = process.env.SAC_API_KEY
scram.resource = process.env.RESOURCE

var argv = require('minimist')(process.argv.slice(2))
if (argv.h || argv.help) {
  printHelpExit()
}
var guid = argv._[0]
var limit = argv['limit']
var info = argv.i || argv.info
var data = argv.d || argv.data
if (typeof guid === 'undefined' && !info && !data) {
  scram.available() // available to stdout
}

if (info || data) {
  if (typeof info === 'string') guid = info
  if (typeof data === 'string') guid = data
  if (typeof guid === 'undefined') {
    console.log('Enter a guid!')
    printHelpExit()
  } else {
    if (info) {
      scram.info(guid)
    }
    if (data) {
      scram.data(guid, limit)
    }
  }
}
function printHelpExit () {
  console.log('Explore Sac County Open datastreams')
  console.log('')
  console.log('Usage: node scram-cli (-h --help) (-l --limit=50) (-i --info|-d --data) -- [GUID] ')
  console.log('')
  console.log('Calling without arguments will return the possible GUIDs')
  process.exit(0)
}
