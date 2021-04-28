import React from 'react';
import {Link } from 'react-router-dom';
import './overall.css'


function MenuBar()
{
    /*const navButton ={
        fontSize: '12pt',
        fontFamily: 'helvetica',
        color: '#1e2638',
        textDecoration: 'none',
        textAlign: 'center',
        margin: '0 auto',
        width: '33%'
    };*/
    const navLink ={
        fontSize: '12pt',
        fontFamily: 'helvetica',
        color: 'white',
        textDecoration: 'none',
        background: 'black',
        boxShadow: 'none',
        border: 'none',
        padding: '5px 10px',
        height: '100%',
        width: '100%',
        cursor: 'pointer',
        margin: '0',
    }
 

    return(
        <div>
            <table className = 'menu'>
                <tbody>
                    <tr>
                        <td><Link to= '/'><button className="link">Home</button></Link></td> 
                        <td><Link to='/about'><button className="link">About</button></Link></td>
                        <td><Link to ='/login'><button id="signin" className="link">Login</button></Link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default MenuBar;