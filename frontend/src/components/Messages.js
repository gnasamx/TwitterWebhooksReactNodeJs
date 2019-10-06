import React from 'react';

const Messages = ({match}) => {
  return <div>Messages- {match.params.tweets}</div>;
};

export default Messages;
