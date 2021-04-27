import React from 'react';
import RetrieveEvent from './RetrieveEvent';
import SetWeekButton from './SetWeekButton';
import './SideBar.css';

function SideBar()
{
    return(
        <div>
            <p className="Sidebar"><br/><br/><br/>
            <RetrieveEvent />
            <SetWeekButton />
            </p>
        </div>
    );
}
export default SideBar;