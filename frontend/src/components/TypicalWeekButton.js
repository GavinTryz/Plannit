import React from 'react';

function linkChange(){
    window.location.href = '/dashboard/viewWeek'
}

function TypicalWeekButton(){
    return  <div>
                <button onClick={linkChange}>Typical Week</button>
            </div>
}
export default TypicalWeekButton;