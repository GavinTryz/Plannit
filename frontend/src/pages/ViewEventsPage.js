import React from 'react';
import InternalMenuBar from '../components/InternalMenuBar';
import SideBar from '../components/SideBar';
import './viewEventsPageStyles.css';
import MainViewEvents from '../components/MainViewEvents';

const ViewEventsPage = () =>
{
    return(
        <div className="regMain">
  
          <SideBar />
          <InternalMenuBar />
          <MainViewEvents />
          
        </div>
      );
};

export default ViewEventsPage;
