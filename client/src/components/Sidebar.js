import React, {useState, useEffect, useRef} from 'react';
import Event from '../atoms/Event';
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

const Sidebar = () => {
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

        // if (event.hasOwnProperty('tweet_create_events')) {
        //   event.tweet_create_events.forEach(tweet => {
        //     const newTwitterEvent = {
        //       internal_id: internal_id,
        //       byUser: tweet.user.name,
        //       text: tweet.text,
        //     };
        //     if (
        //       event.tweet_create_events.length > 0 &&
        //       containsEvent(newTwitterEvent, twitterEvents) === false
        //     ) {
        //       setTwitterEvents(prevoiusEvents => [
        //         ...prevoiusEvents,
        //         newTwitterEvent,
        //       ]);
        //     }
        //   });
        // } else {
        //   console.log('tweet_create_events does not exists');
        // }
      });
    } catch (error) {
      console.log('Something went wrong: ', error);
    }

    return () => {
      socket.close();
    };
  }, [socket, twitterEvents]);
  return (
    <>
      <Event value="one" />
      <Event value="one" />
      <pre>{JSON.stringify(twitterEvents)}</pre>
    </>
  );
};

export default Sidebar;
