import React from 'react';

import PageTitle from '../components/PageTitle';
import MenuBar from '../components/MenuBar';

const AboutPage = () =>
{
  const background = 
  {
      backgroundImage: 'url(/plannitBg2.png)',
      backgroundPosition: 'center',
      width: '100vw',
      height: '100vh',
      backgroundSize: 'cover'
  }

  const textStyle = 
  {
      margin: '0 auto',
      color: 'white',
      fontFamily: 'helvetica',
      fontSize: '18pt',
      textAlign: 'center',
      padding: '100px 0 0 0'
  }

  const listStyle = 
  {
    listStyle: 'none'
  }

    return(
      <div style = {background}>
        <MenuBar />
        
        <p style = {textStyle}>

        <h1>What is Plannit?</h1>
          Plannit is a tool for planning and organizing events with groups of people.
          <h2>Features</h2>
          <ul style = {listStyle}>
            <li>Create and customize events spanning across a week.</li><br></br>
            <li>Set a default week, based on your typical schedule.</li><br></br>
            <li>Find a time that works best for everyone.</li><br></br>
          </ul>
          </p>
      </div>
    );
};

export default AboutPage;