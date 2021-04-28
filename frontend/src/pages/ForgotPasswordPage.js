import React from 'react';
import MenuBar from '../components/MenuBar';
import ForgotPassword from '../components/ForgotPassword';

const ForgotPasswordPage = () =>
{
  const background={
    backgroundImage: 'url(/plannitBg2.png)',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover'
  }
    return(
      <div style = {background}>
        <MenuBar />
        <ForgotPassword />
      </div>
    );
};

export default ForgotPasswordPage;