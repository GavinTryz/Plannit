import React from 'react';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import MenuBar from '../components/MenuBar';

const LoginPage = () =>
{

    return(
      <div>
        <PageTitle />
        <MenuBar />
        <Login />
      </div>
    );
};

export default LoginPage;
