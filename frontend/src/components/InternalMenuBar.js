import React from "react";
import './InternalMenuBar.css';
import CreateEvent from './CreateEvent';
import Logout from './Logout';

import {useSelector} from 'react-redux';

function InternalMenuBar(){
    
    const userData = useSelector(state => state.userData);

    return(
        <div>
        <table className = 'internalMenu'>
            <tr>
                <td><CreateEvent /></td> 
                <td><Logout /></td>
                {userData.userId}
            </tr>
        </table>
        </div>
    );
}
export default InternalMenuBar;
