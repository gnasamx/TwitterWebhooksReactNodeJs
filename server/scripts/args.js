const commandLineArgs = require('command-line-args')

const optionDefinitions = [
  { name: 'url', alias: 'u', type: String },
  { name: 'environment', alias: 'e', type: String },
  { name: 'webhookid', alias: 'i', type: String }
]


module.exports = commandLineArgs(optionDefinitions)