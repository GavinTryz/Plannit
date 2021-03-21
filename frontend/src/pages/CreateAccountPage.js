import React from 'react';

import MenuBar from '../components/MenuBar';

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
      </div>
    );
};

export default CreateAccountPage;
