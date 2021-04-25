import React from 'react';

function linkChange(){
    window.location.href = '/dashboard/setWeek'
}

function SetWeekButton(){
    return <button onClick={linkChange}>Set Typical Week</button>
}

export default SetWeekButton;