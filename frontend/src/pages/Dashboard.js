import React from 'react';
import InternalMenuBar from '../components/InternalMenuBar';
import SideBar from '../components/SideBar';


const Dashboard = () =>
{

  const background={
    backgroundImage: 'url(/PlannitHome7.png)',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover'

  }


    return(
      
      <div style = {background}>
        <SideBar />
        <InternalMenuBar />

      </div>
    );
};
export default Dashboard;
