import React from 'react';
import InternalMenuBar from '../components/InternalMenuBar';
import SideBar from '../components/SideBar';
import Welcome from '../components/Welcome';


const Dashboard = () =>
{

  const background={
    backgroundImage: 'url(/PlannitHome9.png)',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover'

  }


    return(
      
      <div style = {background}>
      {/*<Welcome />*/}
        <SideBar />
        <InternalMenuBar />

      </div>
    );
};
export default Dashboard;
