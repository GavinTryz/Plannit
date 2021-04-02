import React from 'react';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import MenuBar from '../components/MenuBar';
import CreateAccountButton from '../components/CreateAccountButton';

const HomePage = () =>
{
  const background={
    backgroundImage: 'url(/plannitgraph.png)',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover'
  }
  const textStyle={
    color: 'white',
    fontFamily: 'helvetica',
    fontSize: '18pt',
    textAlign: 'center',
    padding: '300px'
  }


    return(
      <div style = {background}>
        <MenuBar /><br />
        <CreateAccountButton />
        <p style = {textStyle}>We can write here some text that describe what Plannit is about. Do you have any ideas?</p>
      </div>
    );
};

export default HomePage;