import React, {useState} from 'react'
import axios from 'axios';
import './calendar.css';
import EventCalendarCell from './EventCalendarCell';

function EventCalendar(props){

    // Objects received from SetCalendar.js
    var dayOfWeekObj = props.daysAvailable;
    var timeObj = props.time;
    const [finalEvent, setFinalEvent] = useState(createCalendar(false));

    function createCalendar(value) {
        const rows = 7;
        const cols = 48;

        const nestedArray = Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => value)
        );
        return nestedArray;
    }

   var daysOfWeek = ['Time', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var tableCell = (dayOfWeekObj, timeObj, nameofDay) =>{
        if (dayOfWeekObj != "")
            return(
                <tr>
                    <EventCalendarCell time={timeObj} day={nameofDay} calendar={props.calendar} finalEvent={finalEvent} setFinalEvent={setFinalEvent} numParticipants={props.numParticipants}/>
                    <EventCalendarCell time={timeObj +  ':30'} day={nameofDay} calendar={props.calendar} finalEvent={finalEvent} setFinalEvent={setFinalEvent} numParticipants={props.numParticipants}/>
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
        </div> 
       );
}
export default EventCalendar;