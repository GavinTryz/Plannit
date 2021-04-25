import React from 'react';
import Build5 from './Build5';

import {useSelector} from 'react-redux';

function Set5(){

    const eventData = useSelector(state => state.eventData);
    var dayOfWeekObj = eventData.daysOfWeek;
    var start = parseInt(eventData.startTime);
    var end = parseInt(eventData.endTime);
    var timeArr = [];
    
    for ( var i = 0 ; i < dayOfWeekObj.length ; i++ ){
        if (dayOfWeekObj[i] != "")
            dayOfWeekObj[i] = false;
        else
            dayOfWeekObj[i] = true;
    }

    //var dayOfWeekObj = [false,true,true,true,true,true,true]

    for ( var i = start ; i <= end ; i++ ){
        timeArr.push(i);
    }

    //console.log(timeArr);
    //console.log(dayOfWeekObj);

    return(
        <Build5
            daysAvailable = {dayOfWeekObj}
            time = {timeArr}
        />
    );
}
export default Set5;