import React, {Component} from 'react';
import Event from '../atoms/Event';
import {connect} from 'react-redux';
import {logoutTWUser} from '../actions/AuthActionTypes';
import openSocket from 'socket.io-client';
import {tweetCreateEvent} from '../actions/TweetCreateActionTypes';

class Sidebar extends Component {
  componentDidMount() {
    const socket = openSocket('https://f4e5c5b6.ngrok.io');
    socket.on('event', data => {
      const {event} = data;
      console.log(event);
      if (event.hasOwnProperty('tweet_create_events')) {
        let added = this.props.tweetEvents.some(function(te) {
          return (
            te.tweet_create_events[0].id === event.tweet_create_events[0].id
          );
        });
        if (!added) {
          this.props.tweetCreateEvent(event);
        }
      }
    });
  }

  handleLogout = () => {
    this.props.logoutTWUser();
  };
  render() {
    const renderTweetEvents = this.props.tweetEvents.map((te, i) => {
      return (
        <Event
          key={i}
          id={te.tweet_create_events[0].id}
          name={te.tweet_create_events[0].user.name}
          text={te.tweet_create_events[0].text}
          profile_image={te.tweet_create_events[0].user.profile_image_url_https}
        />
      );
    });
    return <>{renderTweetEvents}</>;
  }
}

const mapStateToProps = state => {
  const {
    authenticationReducer: {user},
    tweetCreateReducer: {tweetEvents},
  } = state;
  return {user, tweetEvents};
};

const actionCreators = {
  logoutTWUser,
  tweetCreateEvent,
};

export default connect(
  mapStateToProps,
  actionCreators,
)(Sidebar);
