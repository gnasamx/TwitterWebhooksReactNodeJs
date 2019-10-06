import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/event.css';

const Event = ({id, name, text, profile_image}) => {
  return (
    <Link to={'' + id} className="no-underline">
      <div className="event-container">
        <div>
          <div className="event-user-profile">
            <img
              src={profile_image}
              alt={profile_image}
              className="profile-image"
              width="50px"
            />
          </div>
        </div>
        <div className="event-user-details">
          <div className="event-user-name">{name}</div>
          <div className="event-text">{text}</div>
        </div>
      </div>
    </Link>
  );
};

export default Event;
