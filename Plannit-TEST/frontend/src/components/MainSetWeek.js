import React from 'react';
import './Main.css'

import SetCalendar from './SetCalendar';


function MainSetWeek()
{
    return(
        <div class="main">
            <span>This is the Set Typical Week Table</span>
            <SetCalendar />
        </div>
    );
}
export default MainSetWeek;