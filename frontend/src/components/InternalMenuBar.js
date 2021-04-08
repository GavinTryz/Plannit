import React from "react";
import './InternalMenuBar.css';
import CreateEvent from './CreateEvent';

function InternalMenuBar(){

    return(
        <div>
        <table className = 'internalMenu'>
            <tr>
                <td><CreateEvent /></td> 
                <td><button>Log Out</button></td>
            </tr>
        </table>
        </div>
    );
}
export default InternalMenuBar;