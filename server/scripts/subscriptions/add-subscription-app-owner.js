const request = require('request-promise')
const queryString = require('query-string');
const prompt = require('prompt-promise');
const args = require('../args.js')
require("dotenv").config();


var request_options = {
  url: 'https://api.twitter.com/1.1/account_activity/all/' + args.environment + '/subscriptions.json',
  oauth: {
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET_KEY,
    token: process.env.TWITTER_ACCESS_TOKEN,
    token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  },
  resolveWithFullResponse: true
}

request.post(request_options).then(function (response) {
  console.log('HTTP response code:', response.statusCode)

  if (response.statusCode == 204) {
    console.log('Subscription added.')
  }
}).catch(function (response) {
  console.log('Subscription was not able to be added.')
  console.log('- Verify environment name.')
  console.log('- Verify "Read, Write and Access direct messages" is enabled on apps.twitter.com.')
  console.log('Full error message below:')
  console.log(response.error)
})