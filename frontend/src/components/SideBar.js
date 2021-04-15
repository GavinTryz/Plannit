import React from 'react';
import RetrieveEvent from './RetrieveEvent';
import SetWeekButton from './SetWeekButton';
import ViewEventButton from './ViewEventButton';
import './SideBar.css'


function SideBar()
{
    return(
        <div>
            <p className="Sidebar">
            Sidebar
            <RetrieveEvent />
            <SetWeekButton />
            <ViewEventButton />
            </p>
        </div>
     
    );


}
export default SideBar;