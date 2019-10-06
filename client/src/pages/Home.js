import React from 'react';
import '../styles/home.css';
import Feature from '../components/Feature';
import Header from '../components/Header';
import Replay from '../components/Reply';
import SidebarMessagesPage from '../components/SidebarMessagesPage';

const Home = () => {
  return (
    <div className="tweetpanel-app-layout">
      <div className="feature">
        <Feature />
      </div>

      <div className="header">
        <Header />
      </div>

      <SidebarMessagesPage />

      <div className="reply">
        <Replay />
      </div>
    </div>
  );
};

export default Home;
