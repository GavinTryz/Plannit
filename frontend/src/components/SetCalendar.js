import React from 'react';
import RetrieveCalendar from './RetrieveCalendar';

function SetCalendar(){

    var dayOfWeekObj = {
        sunday: true,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true
    };

    var timeArr = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6];



    return(
        <RetrieveCalendar
            daysAvailable = {dayOfWeekObj}
            time = {timeArr}

        />
        );
}
export default SetCalendar;