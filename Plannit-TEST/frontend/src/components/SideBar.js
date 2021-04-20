import React from 'react';
import RetrieveEvent from './RetrieveEvent';
import SetWeekButton from './SetWeekButton';
import ViewEventButton from './ViewEventButton';
import './SideBar.css'

import ParticipantList from './ParticipantList';
import EMPTY_BUTTON from './EMPTY_BUTTON';

function SideBar()
{
    return(
        <div>
            <p className="Sidebar">
            Sidebar
            <RetrieveEvent />
            <SetWeekButton />
            <ViewEventButton />
            <EMPTY_BUTTON />
            <ParticipantList />
            </p>
        </div>
     
    );


}
export default SideBar;