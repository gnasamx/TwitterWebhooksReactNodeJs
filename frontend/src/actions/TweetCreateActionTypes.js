import {
  TWEET_CREATE_EVENT,
  GET_ALL_TWEET_EVENTS,
} from '../constants/TweetCreateContstants';
import {createTweetEventService} from '../services/tweetCreateService';

export function tweetCreateAction(newTweetEvent) {
  return {
    type: TWEET_CREATE_EVENT,
    newTweetEvent,
  };
}

export function tweetCreateEvent(newTweetEvent) {
  return dispatch => {
    dispatch(tweetCreateAction(newTweetEvent));
    createTweetEventService(newTweetEvent)
      .then(response => console.log(response))
      .catch(errorMessage => console.log('errorMessage: ', errorMessage));
  };
}

export function getAllTweetEventsAction() {
  return {
    type: GET_ALL_TWEET_EVENTS,
  };
}

export function getAllTweetEvents() {
  return 
}