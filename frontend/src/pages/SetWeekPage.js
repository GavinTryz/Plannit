import React from 'react';
import InternalMenuBar from '../components/InternalMenuBar';
import SideBar from '../components/SideBar';

import MainSetWeek from '../components/MainSetWeek';


const HomePage = () =>
{
    return(
        <div>
  
          <SideBar />
          <InternalMenuBar />
          <MainSetWeek />
          
        </div>
      );
};

export default HomePage;