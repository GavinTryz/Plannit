import React from 'react';
import InternalMenuBar from '../components/InternalMenuBar';
import SideBar from '../components/SideBar';

import MainTypicalWeek from '../components/MainTypicalWeek';


const TypicalWeekPage = () =>
{
    return(
        <div>
  
          <SideBar />
          <InternalMenuBar />
          <MainTypicalWeek />
          
        </div>
      );
};

export default TypicalWeekPage;