import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './calendar.css';
import Info4 from './Info4';

import {storeEventTable} from '../actions';
import {useDispatch} from 'react-redux';

const jwt = require('jsonwebtoken');

function Build4(props){

    const storage = require('../tokenStorage');
    const bp = require('./bp');
    const [calendar, setCalendar] = useState(createCalendar());
    const [particpantArr, setparticpantArr] = useState(createParticipantCalendar());

    // Objects received from SetCalendar.js
    var dayOfWeekObj = props.daysAvailable;
    var timeObj = props.time;

    //creating example array for testing, later fill w actual user availablity
    var names = "Bob Bobby, Rob Robert, Lu Lulu";
    var userAvail = [...Array(7)].map(e => Array(48).fill(false));
    userAvail[0][18] = true;
    userAvail[1][19] = true;
    userAvail[2][20] = true;
    userAvail[3][21] = true;
    userAvail[4][22] = true;
    userAvail[5][23] = true;
    userAvail[6][24] = true;
    userAvail[0][28] = true;
    userAvail[1][28] = true;
    userAvail[2][28] = true;
    userAvail[3][28] = true;
    userAvail[4][28] = true;
    userAvail[5][28] = true;
    userAvail[6][28] = true;
    
    //console.log(userAvail);

    function createCalendar() {     //keep same for select funtion? else change w props | ask db 
        const rows = 7;
        const cols = 48;

        const nestedArray = Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => false)
        );
        return nestedArray;
    }

    function createParticipantCalendar() {     //keep same for select funtion? else change w props | ask db 
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
                    <Info4 time={timeObj} day={nameofDay} calendar={calendar} setCalendar={setCalendar} name={names} userAvail={userAvail}/>
                    <Info4 time={timeObj +  ':30'} day={nameofDay} calendar={calendar} setCalendar={setCalendar} name={names} userAvail={userAvail}/>
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

//Populate participant names in table
    const dispatch = useDispatch();

    useEffect(()=>{
    }, [])

    return(
        <div>
            <table className = 'calendarTable'>
                {daysOfWeek.map(tableHeader)}
                {timeObj.map(makecolumns)}   
            </table>
        </div> 
       );
}
export default Build4;