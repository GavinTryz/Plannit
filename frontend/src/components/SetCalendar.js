import React from 'react';
import RetrieveCalendar from './RetrieveCalendar';

function SetCalendar(){

    var dayOfWeekObj = {    //what days show on the calendar?
        sunday: true,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true
    };

    var timeArr = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];  //times that show on cal

    return(
        <RetrieveCalendar
            daysAvailable = {dayOfWeekObj}
            time = {timeArr}
        />
        );
}
export default SetCalendar;