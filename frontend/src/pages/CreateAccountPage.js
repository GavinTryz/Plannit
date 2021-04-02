import React from 'react';

import MenuBar from '../components/MenuBar';
import CreateAccount from '../components/CreateAccount';

const CreateAccountPage = () =>
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
        <CreateAccount />
      </div>
    );
};

export default CreateAccountPage;