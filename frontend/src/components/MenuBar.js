import React from 'react';
import {Link } from 'react-router-dom';


function MenuBar()
{
    const navButton ={
        fontSize: '12pt',
        fontFamily: 'helvetica',
        color: '#1e2638',
        textDecoration: 'none',
        textAlign: 'center',
        margin: '0 auto'
    };
    const navLink ={
        fontSize: '12pt',
        fontFamily: 'helvetica',
        color: 'white',
        textDecoration: 'none',
    
    }
 

    return(
        <div>
            <table className = 'menu'>
                <tbody>
                    <tr>
                        <td><Link style= {navLink} to= '/'>Home </Link></td> 
                        <td><Link style= {navLink} to='/about'>About</Link></td>
                        <td><Link to ='/login'><button style={navButton}>Sign In</button></Link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default MenuBar;