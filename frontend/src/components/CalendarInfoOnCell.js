import React, {useState, useEffect} from 'react'
import './calendar.css';

function CalendarInfoOnCell(props){
    const [checked, setChecked] = useState(isChecked());
    const jwt = require('jsonwebtoken');
    const storage = require('../tokenStorage');

    function stringToInt(day){
        if(day === "Sunday"){
            return 0;
        }
        if(day === "Monday"){
            return 1;
        }
        if(day === "Tuesday"){
            return 2;
        }
        if(day === "Wednesday"){
            return 3;
        }
        if(day === "Thursday"){
            return 4;
        }
        if(day === "Friday"){
            return 5;
        }
        return 6
    }
    // RN this function id for testing 
    function handleChange(event)
    {
        //console.log(tok.userId);
        var newCalendar = props.calendar;
        var arr = props.time.toString().split(':');
        var dayIndex = arr[0]*2;
        if(arr.length == 2)
        {
            dayIndex++;
        }
        /*console.log(props.day);
        console.log(dayIndex);
        console.log(event.target.checked);*/
        newCalendar[stringToInt(props.day)][dayIndex] = event.target.checked;
        console.log(newCalendar);
        props.setCalendar(newCalendar);   
        //alert('selected hour is ' + props.time + 'and the day is ' + props.day);

    }
    function isChecked(){
        var arr = props.time.toString().split(':');
        var dayIndex = arr[0]*2;
        if(arr.length == 2)
        {
            dayIndex++;
        }
        var check = props.calendar[stringToInt(props.day)][dayIndex];

        return check;
    }
    return(
        <tr>
            <label className = "calendarCell"><input type="checkbox" onChange={handleChange} defaultChecked={checked}/>
            <span className="calendarCellOn"/>
            </label>
         </tr>
    );
}
export default CalendarInfoOnCell;