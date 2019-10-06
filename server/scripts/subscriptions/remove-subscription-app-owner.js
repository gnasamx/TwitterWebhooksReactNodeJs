const request = require('request-promise')
const auth = require('../../helpers/auth.js')
const args = require('../args.js')


// request options
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

// POST request to create webhook config
request.delete(request_options).then(function (response) {
  console.log('HTTP response code:', response.statusCode)

  if (response.statusCode == 204) {
    console.log('Subscription removed.')
  }
}).catch(function (response) {
  console.log('HTTP response code:', response.statusCode)
  console.log('Incorrect environment name or user has not authorized your app.')
})