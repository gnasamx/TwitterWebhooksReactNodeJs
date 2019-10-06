import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Sidebar from './Sidebar';
import Messages from './Messages';
import '../styles/home.css';

const SidebarMessagesPage = () => {
  return (
    <BrowserRouter>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="messages">
        <Route path="/:tweets" exact component={Messages} />
      </div>
    </BrowserRouter>
  );
};

export default SidebarMessagesPage;
