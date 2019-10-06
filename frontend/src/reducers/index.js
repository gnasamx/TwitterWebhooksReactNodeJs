import {combineReducers} from 'redux';
import {authenticationReducer} from './AuthenticationReducer';
import {tweetCreateReducer} from './TweetCreateReducer';
const rootReducer = combineReducers({
  authenticationReducer,
  tweetCreateReducer,
});

export default rootReducer;
