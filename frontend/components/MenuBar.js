import React from 'react';
import {Link } from 'react-router-dom';


function MenuBar()
{
    const navButton ={
        fontSize: '12pt',
        fontFamily: 'helvetica',
        color: 'green',
        textDecoration: 'none',
        textAlign: 'center',
        margin: '0 auto'
    };
    const navLink ={
        fontSize: '12pt',
        fontFamily: 'helvetica',
        color: 'green',
        textDecoration: 'none',
    
    }
 

    return(
        <div>
            <table class = 'menu'>
                <tr>
                    <td><Link style= {navLink} to= '/'>Home </Link></td> 
                    <td><Link style= {navLink} to='/about'>about</Link></td>
                    <td><Link to ='/login'><button style={navButton}>Sign In</button></Link></td>
                </tr>
            </table>
        </div>
    );
}

export default MenuBar;