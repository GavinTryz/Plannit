import React, {useState} from 'react'
import axios from 'axios';
import './calendar.css';
import CalendarInfoOnCell from './CalendarInfoOnCell';

/**********************************************************************************************************
 *                             I AM CRAFTING A CALENDAR. STILL ON WORK
 * ********************************************************************************************************/

function RetrieveCalendar(props){

    // Objects received from SetCalendar.js
    var dayOfWeekObj = props.daysAvailable;
    var timeObj = props.time;


   var daysOfWeek = ['Time', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // var dayOfWeekObj = {
    //     sunday: true,
    //     monday: true,
    //     tuesday: true,
    //     wednesday: true,
    //     thursday: true,
    //     friday: true,
    //     saturday: true
    // };

    // var timeObj = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6];

    var tableCell = (dayOfWeekObj, timeObj, nameofDay) =>{
        if (dayOfWeekObj === true)
            return(
                <tr>
                    <CalendarInfoOnCell time={timeObj} day={nameofDay} calendar={props.calendar} setCalendar={props.setCalendar}/>
                    <CalendarInfoOnCell time={timeObj +  ':30'} day={nameofDay} calendar={props.calendar} setCalendar={props.setCalendar}/>
                </tr>
            );
        else
            return(
                <tr>
                    <tr><span className="calendarCellOff"/></tr>
                    <tr><span className="calendarCellOff"/></tr>
                </tr>
            );
    }


    
    var tableHeader = (daysOfWeek, index) =>{       
        return(
                <th className='calendarTh' key={index}>{daysOfWeek}</th>
        );
    }
    
    var makecolumns = (timeObj, index) =>{
        return(
            <tr key ={index}>
                <td className='calendarTd'>{timeToString(timeObj)}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.sunday, timeObj, 'Sunday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.monday, timeObj, 'Monday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.tuesday, timeObj, 'Tuesday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.wednesday, timeObj, 'Wednesday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.thursday, timeObj, 'Thursday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.friday, timeObj, 'Friday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.saturday, timeObj, 'Saturday')}</td>
            </tr>
        );
    }
    function timeToString(time) {
        var newTime = '';
        if(time > 12)
        {
            time = time % 12;
            newTime = time.toString() + " p.m.";
        }
        else if(time == 12)
        {
            newTime = time.toString() + " p.m.";
        }
        else 
        {
            newTime = time.toString() + " a.m.";
        }
        return newTime;
    }
    
    return(
        <div>
            <table className = 'calendarTable'>
                {daysOfWeek.map(tableHeader)}
                {timeObj.map(makecolumns)}   
            </table>
            <button onClick={props.handleSubmit}>
                Submit
            </button>
        </div> 
       );
}
export default RetrieveCalendar;