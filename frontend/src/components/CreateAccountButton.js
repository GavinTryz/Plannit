import React from 'react';
import {Link } from 'react-router-dom';

function CreateAccountButton(){

    const Style={
        fontSize: '20pt',
        fontFamily: 'helvetica',
        border: '2px solid',
        borderRadius: '10px',
        color: '#1e2638',
        padding: '10px 20px 10px 20px',
        textDecoration: 'none',
        textAlign: 'center',
        position: 'absolute',
        marginLeft: '60%',
        top: '75%',
        cursor: 'pointer',
        backgroundColor: '#f2d49b'
    }

    return(
        <div>
            <Link to ='/createaccount'><button style={Style}>Create free account</button></Link>
        </div>

    );

}

export default CreateAccountButton;