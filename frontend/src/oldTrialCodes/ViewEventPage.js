import React from 'react';
import InternalMenuBar from '../components/InternalMenuBar';
import SideBar from '../components/SideBar';
import './viewEventsPageStyles.css';

import MainViewEvent from '../components/MainViewEvent';

const ViewEventPage = () =>
{
    return(
        <div className="stylePage">
  
          <SideBar />
          <InternalMenuBar />
          <MainViewEvent />
          
        </div>
      );
};

export default ViewEventPage;
