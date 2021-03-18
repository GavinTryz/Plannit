import React from 'react';


function PageTitle()
{
    const tileStyle ={
        textAlign: 'center',
        fontSize: '50px',
        fontFamily: 'helvetica',
        color: 'green'
    }


    return(
        <h1 style={tileStyle} id="title">Plannit</h1>
    );
}

export default PageTitle;