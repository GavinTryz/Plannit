import React from 'react';
import './Main.css'

import Set2 from './Set2';

function MainViewEvent()
{
    return(
        <div class="main">
            <span>This is the View Event Table w a static example *still has to be adjusted to work w recieved db token</span>
            <Set2 />
        </div>
    );
}
export default MainViewEvent;