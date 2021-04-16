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
            Sidebar\n HEYOOO
            <RetrieveEvent />
            <SetWeekButton />
            <ViewEventButton />
            <EMPTY_BUTTON />
            Sidebar<br /> HEYOOO
            <ParticipantList />
            </p>
        </div>
     
    );


}
export default SideBar;