import React, {useState} from 'react'
import axios from 'axios';
import './calendar.css';
import Color3 from './Color3';
const jwt = require('jsonwebtoken');

function Build3(props){

    const storage = require('../tokenStorage');
    const bp = require('../components/bp');
    const [calendar, setCalendar] = useState(createCalendar());


    // Objects received from SetCalendar.js
    var dayOfWeekObj = props.daysAvailable;
    var timeObj = props.time;

    //----------------------------------------
    var names = "Bob";
    
    //creating empty array for ex, later fill w actual user availablity
    var userAvail = [...Array(7)].map(e => Array(48).fill(false));
    userAvail[0][0] = true;
    userAvail[1][0] = true;
    userAvail[2][0] = true;
    userAvail[3][0] = true;
    //console.log(userAvail);

    function createCalendar() {     //keep same for select funtion? else change w props | ask db 
        const rows = 7;
        const cols = 48;

        const nestedArray = Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => null)
        );
        return nestedArray;
    }

   var daysOfWeek = ['Time', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];     //keep cal the same?

    var tableCell = (dayOfWeekObj, timeObj, nameofDay) =>{
        if (dayOfWeekObj === true)
            return(
                <tr>
                    <Color3 time={timeObj} day={nameofDay} calendar={calendar} setCalendar={setCalendar} name={names} userAvail={userAvail}/>
                    <Color3 time={timeObj +  ':30'} day={nameofDay} calendar={calendar} setCalendar={setCalendar} name={names} userAvail={userAvail}/>
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
    function handleSubmit(event){
        event.preventDefault();
        var tok = storage.retrieveToken();
        axios.post(bp.buildPath('api/createWeek'), {week: calendar, userID: jwt.decode(tok).userId, jwtToken: tok})
        .then((results) => {
            console.log(results);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    return(
        <div>
            <table className = 'calendarTable'>
                {daysOfWeek.map(tableHeader)}
                {timeObj.map(makecolumns)}   
            </table>
            <button onClick={handleSubmit}>
                Submit
            </button>
        </div> 
       );
}
export default Build3;