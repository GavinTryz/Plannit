import React from 'react';
import MenuBar from '../components/MenuBar';
import ResetPassword from '../components/ResetPassword';

const ResetPasswordPage = () =>
{
  const background={
    backgroundImage: 'url(/graphicplanet.png)',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover'
  }
    return(
      <div style = {background}>
        <MenuBar />
        <ResetPassword />
      </div>
    );
};

export default ResetPasswordPage;