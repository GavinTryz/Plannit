import React from 'react';

import MenuBar from '../components/MenuBar';
import CreateAccount from '../components/CreateAccount';

const CreateAccountPage = () =>
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
        <CreateAccount />
      </div>
    );
};

export default CreateAccountPage;
