import React, {useState, useEffect, useRef} from 'react';
import {useTwitterAuthContext} from '../contexts/auth-context';
import openSocket from 'socket.io-client';

const containsEvent = (tweetEvent, allTwitterEvents) => {
  var t;
  for (t in allTwitterEvents) {
    if (t === tweetEvent) {
      console.log('tweet is same dont add');
      return true;
    }
  }
  return false;
};

const Home = () => {
  const {user} = useTwitterAuthContext();
  const [twitterEvents, setTwitterEvents] = useState([]);
  const {current: socket} = useRef(
    openSocket('https://arcane-spire-93028.herokuapp.com/'),
  );

  useEffect(() => {
    try {
      socket.open();
      socket.on('event', data => {
        const {event, internal_id} = data;
        console.log('Event: ', event);

        if (event.hasOwnProperty('tweet_create_events')) {
          event.tweet_create_events.forEach(tweet => {
            const newTwitterEvent = {
              internal_id: internal_id,
              byUser: tweet.user.name,
              text: tweet.text,
            };
            if (
              event.tweet_create_events.length > 0 &&
              containsEvent(newTwitterEvent, twitterEvents) === false
            ) {
              setTwitterEvents(prevoiusEvents => [
                ...prevoiusEvents,
                newTwitterEvent,
              ]);
            }
          });
        } else {
          console.log('tweet_create_events does not exists');
        }
      });
    } catch (error) {
      console.log('Something went wrong: ', error);
    }

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>You have login succcessfully!</h1>
      <h2>Welcome {user.name}</h2>
      <hr />
      <pre>{JSON.stringify(twitterEvents)}</pre>
    </div>
  );
};

export default Home;
