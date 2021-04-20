import React from 'react';
import Build3 from './Build3';

function Set3(){

    var dayOfWeekObj = {    //change w info returned by view event
        sunday: true,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true
    }; 

    var timeArr = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];  //change w info returned by view event



    return(
        <Build3
            daysAvailable = {dayOfWeekObj}
            time = {timeArr}

        />
        );
}
export default Set3;