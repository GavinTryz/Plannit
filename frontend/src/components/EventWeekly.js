import { PromiseProvider } from 'mongoose';
import React from 'react';

// Select if the event occurs every week or not
function EventWeekly(props)
{
    return(
        <span>
            <label>Is it a weekly event? </label>
            <input type="checkbox" value='false' onChange={props.onChange}/>
        </span>
    );
}

export default EventWeekly;