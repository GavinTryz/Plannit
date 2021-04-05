import React from 'react';
import Week from '../components/Week';
import InternalMenuBar from '../components/InternalMenuBar';
import SideBar from '../components/SideBar';
import Calendar from '../components/Calendar';



const Dashboard = () =>
{

    return(
      <div>
        <SideBar />
        <InternalMenuBar />
        <div style={{clear:'both'}}></div>
        <Calendar />
        <Week/>
      </div>
    );
};
export default Dashboard;
