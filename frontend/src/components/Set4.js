import React from 'react';
import Build4 from './Build4';

function Set4(){

    var dayOfWeekObj = {    //change w info returned by view event? pr just keep same
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
        <Build4
            daysAvailable = {dayOfWeekObj}
            time = {timeArr}
        />
        );
}
export default Set4;