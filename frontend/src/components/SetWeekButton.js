import React from 'react';

function linkChange(){
    window.location.href = '/dashboard/setWeek'
}

function SetWeekButton(){
    return <button className="SideBarBtn" style={{margin: "13px 0 5px 0"}}onClick={linkChange}>Set Typical Week</button>
}

export default SetWeekButton;