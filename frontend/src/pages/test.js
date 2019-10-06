import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logoutTWUser} from '../actions/AuthActionTypes';
import openSocket from 'socket.io-client';
import {tweetCreateEvent} from '../actions/TweetCreateActionTypes';

class test extends Component {
  componentDidMount() {
    const socket = openSocket('https://f4e5c5b6.ngrok.io');
    socket.on('event', data => {
      const {event} = data;
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
        <div key={i}>
          <h6>{te.tweet_create_events[0].user.name}</h6>
          <span>{te.tweet_create_events[0].text}</span>
          <hr />
        </div>
      );
    });
    return (
      <>
        <h1>Home</h1>
        <p>{this.props.user.name}</p>
        <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
        <button onClick={this.handleLogout}>Logout</button>
        <hr />
        {renderTweetEvents}
      </>
    );
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
)(test);
