import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/event.css';

const Event = ({value}) => {
  return (
    <Link to={value}>
      <div className="event-container">
        <div>
          <div className="event-user-profile">
            <img
              src="https://pbs.twimg.com/profile_images/1166344766210150401/amRnWzl-_reasonably_small.jpg"
              alt=""
              className="profile-image"
              width="50px"
            />
          </div>
        </div>
        <div className="event-user-details">
          <div className="event-user-name">Ganesh Pawar</div>
          <div className="event-text">
            Sorry for sounding like I thought it was a better API. I don't.
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Event;
