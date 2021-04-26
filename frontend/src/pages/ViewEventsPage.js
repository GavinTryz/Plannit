import React from 'react';
import InternalMenuBar from '../components/InternalMenuBar';
import SideBar from '../components/SideBar';

import MainViewEvents from '../components/MainViewEvents';

const ViewEventsPage = () =>
{
    return(
        <div>
  
          <SideBar />
          <InternalMenuBar />
          <MainViewEvents />
          
        </div>
      );
};

export default ViewEventsPage;