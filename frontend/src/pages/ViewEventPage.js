import React from 'react';
import InternalMenuBar from '../components/InternalMenuBar';
import SideBar from '../components/SideBar';

import MainViewEvent from '../components/MainViewEvent';

const ViewEventPage = () =>
{
    return(
        <div>
  
          <SideBar />
          <InternalMenuBar />
          <MainViewEvent />
          
        </div>
      );
};

export default ViewEventPage;