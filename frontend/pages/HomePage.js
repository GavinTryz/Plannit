import React from 'react';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import MenuBar from '../components/MenuBar';
import CreateAccountButton from '../components/CreateAccountButton';

const HomePage = () =>
{

  const imgStyel={
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '700'
  }

    return(
      <div>
        <PageTitle /><br />
        <MenuBar /><br />
        <img src={'/plannit.jpg' } style ={imgStyel} />
        <CreateAccountButton />
      </div>
    );
};

export default HomePage;