const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetEventSchema = new Schema({
  for_user_id: Number,
  created_at: String,
  id: String,
  in_reply_to_screen_name: String,
  text: String,
  entities: {
    hashtags: [{text: String}],
    urls: [{expanded_url: String}],
    user_mentions: [{name: String, screen_name: String}],
  },
  user: {
    name: String,
    profile_image_url_https: String,
    screen_name: String,
  },
});

const TweetEvent = mongoose.model('tweetEventSchema', tweetEventSchema);

module.exports = TweetEvent;
