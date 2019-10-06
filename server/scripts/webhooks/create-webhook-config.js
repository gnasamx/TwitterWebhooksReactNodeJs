const request = require('request-promise')
const args = require('../args.js')
require("dotenv").config();

// request options
var request_options = {
  url: 'https://api.twitter.com/1.1/account_activity/all/' + args.environment + '/webhooks.json',
  oauth: {
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET_KEY,
    token: process.env.TWITTER_ACCESS_TOKEN,
    token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  },
  headers: {
    'Content-type': 'application/x-www-form-urlencoded'
  },
  form: {
    url: args.url
  }
}


// POST request to create webhook config
request.post(request_options).then(function (body) {
  console.log(body);
}).catch(function (body) {
  console.log(body.error);
})

// {"id":"1172488791895838721","url":"https://arcane-spire-93028.herokuapp.com/webhook/twitter","valid":true,"created_timestamp":"2019-09-13 12:34:47 +0000"}