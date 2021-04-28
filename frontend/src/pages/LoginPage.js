import React from 'react';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import MenuBar from '../components/MenuBar';

const LoginPage = () =>
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
        <Login />
      </div>
    );
};

export default LoginPage;
