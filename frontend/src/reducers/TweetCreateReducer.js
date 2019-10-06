import {TWEET_CREATE_EVENT} from '../constants/TweetCreateContstants';

const initialState = {
  tweetEvents: [],
};

export function tweetCreateReducer(state = initialState, action) {
  switch (action.type) {
    case TWEET_CREATE_EVENT:
      return {
        ...state,
        tweetEvents: [...state.tweetEvents, action.newTweetEvent],
      };
    default:
      return state;
  }
}
