import React from 'react'
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
        if (dayOfWeekObj == true)
            return(
                <tr>
                    <CalendarInfoOnCell time={timeObj} day={nameofDay}/>
                    <CalendarInfoOnCell time={timeObj +  ':30'} day={nameofDay}/>
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
                <td className='calendarTd'>{timeObj}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.sunday, timeObj, 'Sunday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.monday, timeObj, 'Monday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.tuesday, timeObj, 'Monday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.wednesday, timeObj, 'Wednesday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.thursday, timeObj, 'Thursday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.friday, timeObj, 'Friday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj.saturday, timeObj, 'Saturday')}</td>
            </tr>
        );
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
export default RetrieveCalendar;