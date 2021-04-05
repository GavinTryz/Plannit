import React from "react";
import './InternalMenuBar.css'

function InternalMenuBar(){

    return(
        <div>
        <table className = 'internalMenu'>
            <tr>
                <td></td> 
                <td><button>Create Event</button></td>
                <td><button>Log Out</button></td>
            </tr>
        </table>
        </div>
    );
}
export default InternalMenuBar;