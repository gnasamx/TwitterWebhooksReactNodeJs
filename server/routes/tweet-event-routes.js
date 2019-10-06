const router = require('express').Router();
const TweetEvent = require('../models/tweetEvent');

router.post('/create/new', async (req, res) => {
  try {
    const {for_user_id, tweet_create_events} = req.body;

    const {
      created_at,
      id,
      in_reply_to_screen_name,
      text,
      entities,
      user,
    } = tweet_create_events[0];

    const allHashTags = [];
    entities.hashtags.map(tag => {
      return allHashTags.push({text: tag.text});
    });

    const allUrls = [];
    entities.urls.map(url => allUrls.push({expanded_url: url.expanded_url}));

    const allMentions = [];
    entities.user_mentions.map(mention =>
      allMentions.push({name: mention.name, screen_name: mention.screen_name}),
    );

    const tweetEvent = await new TweetEvent({
      for_user_id,
      created_at,
      id,
      in_reply_to_screen_name,
      text,
      entities: {
        hashtags: allHashTags,
        urls: allUrls,
        user_mentions: allMentions,
      },
      user: {
        name: user.name,
        profile_image_url_https: user.profile_image_url_https,
        screen_name: user.screen_name,
      },
    }).save();

    console.log('tweetEvent: ', tweetEvent);
    res.status(200).json({
      success: true,
      message: 'new tweet event created',
      tweetEvent,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

router.get('/all', async (req, res) => {
  try {
    const allTweetEvents = await TweetEvent.find({});
    res.status(200).json({
      success: true,
      allTweetEvents,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

module.exports = router;
