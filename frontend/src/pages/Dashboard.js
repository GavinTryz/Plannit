import React from 'react';
import Week from '../components/Week';


const Dashboard = () =>
{
  const background={
    backgroundImage: 'url(/dashboard.png)',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover'
  }

    return(
      <div style = {background}>
         <Week />
      </div>
    );
};
export default Dashboard;
