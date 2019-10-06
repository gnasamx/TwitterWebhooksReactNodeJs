const request = require('request-promise')
const args = require('../args.js')


// request options
var request_options = {
  url: 'https://api.twitter.com/1.1/account_activity/all/' + args.environment + '/webhooks.json',
  oauth: {
    consumer_key: "ATsvXSmSrvRJGfssuSQ4YM0fd",
    consumer_secret: "dPq2vrGmEayk7mZqyRk5hrfovrlvksa22eWIZ4al75yrAUOUPU",
    token: "803884128076578816-DLg0A8FUarH0YgyZhf9POQSxF88ZeU6",
    token_secret: "nbFwv4ix4K0QH1yVxUhXaXdoxZhsebNeaMnGpkRoCQRMa",
  },
}


// GET request to retreive webhook config
request.get(request_options).then( function (body) {
  // parse webhook ID
  var webhook_id = JSON.parse(body)[0].id
  
  console.log('Deleting webhook config:', webhook_id)

  // update request options for delete endpoint
  request_options = {
    url: 'https://api.twitter.com/1.1/account_activity/all/' + args.environment + '/webhooks/' + webhook_id + '.json',
    oauth: {
      consumer_key: "ATsvXSmSrvRJGfssuSQ4YM0fd",
      consumer_secret: "dPq2vrGmEayk7mZqyRk5hrfovrlvksa22eWIZ4al75yrAUOUPU",
      token: "803884128076578816-DLg0A8FUarH0YgyZhf9POQSxF88ZeU6",
      token_secret: "nbFwv4ix4K0QH1yVxUhXaXdoxZhsebNeaMnGpkRoCQRMa",
  },
    resolveWithFullResponse: true
  }

  // DELETE request to delete webhook config
  return request.delete(request_options)

}).then(function (response) {
  console.log('HTTP response code:', response.statusCode)

  if (response.statusCode == 204) {
    console.log('Webhook config deleted.')
  }
}).catch(function (response) {
  console.log('HTTP response code:', response.statusCode)
  console.log('Error deleting webhook config.')
})