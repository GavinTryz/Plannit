import React from 'react';
import MenuBar from '../components/MenuBar';
import {Link } from 'react-router-dom';

const EmailConfirmationPage = () =>
{
    const background = 
    {
        backgroundImage: 'url(/graphicplanet.png)',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        backgroundSize: 'cover'
    }

    const textStyle = 
    {
        color: 'white',
        fontFamily: 'helvetica',
        fontSize: '18pt',
        textAlign: 'center',
        padding: '300px'
    }

    return(
      <div style = {background}>
        <MenuBar />
        <p style = {textStyle}>Please check your email to verify your account.</p>
      </div>
    );
}

export default EmailConfirmationPage;