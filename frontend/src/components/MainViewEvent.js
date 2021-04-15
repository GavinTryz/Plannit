import React from 'react';
import './Main.css'

import Set2 from './Set2';
import Set3 from './Set3';


function MainViewEvent()
{
    return(
        <div class="main">
            <span>This is the View Event Table</span>
            <Set2 />
            <Set3 />
        </div>
    );
}
export default MainViewEvent;