const request = require('request-promise');
const auth = require('../helpers/auth.js');

const subscription = {};

subscription.createSubscriptionForAppOwner = function(userToken, userSecret) {
  var request_options = {
    url:
      'https://api.twitter.com/1.1/account_activity/all/' +
      auth.twitter_webhook_environment +
      '/subscriptions.json',
    oauth: {
      consumer_key: process.env.TWITTER_API_KEY,
      consumer_secret: process.env.TWITTER_API_SECRET_KEY,
      token: userToken,
      token_secret: userSecret,
    },
    resolveWithFullResponse: true,
  };

  request
    .post(request_options)
    .then(function(response) {
      console.log('HTTP response code:', response.statusCode);
      if (response.statusCode === 204) {
        console.log('Subscription added.');
      }
    })
    .catch(function(response) {
      console.log('Subscription was not able to be added.');
      console.log(response.error);
    });
};

module.exports = subscription;
