import React from "react";
import './InternalMenuBar.css';
import CreateEvent from './CreateEvent';
import Logout from './Logout';
import RetrieveEvent from "./RetrieveEvent";

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
