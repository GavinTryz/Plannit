import React from "react";
import './InternalMenuBar.css';
import CreateEvent from './CreateEvent';
import Logout from './Logout';

function InternalMenuBar(){

    return(
        <div>
        <table className = 'internalMenu'>
            <tr>
                <td><CreateEvent /></td> 
                <td><Logout /></td>
            </tr>
        </table>
        </div>
    );
}

export default InternalMenuBar;
