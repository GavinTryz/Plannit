import React from 'react';
import {Link } from 'react-router-dom';

function SetWeekButton(){

    return <Link to ='dashboard/setWeek'><button>Set Typical Week</button></Link>;
}
export default SetWeekButton;