import React from 'react';

function linkChange(){
    window.location.href = '/dashboard/setWeek'
}

function SetWeekButton(){
    return <button className="SideBarBtn" onClick={linkChange}>Set Typical Week</button>
}

export default SetWeekButton;