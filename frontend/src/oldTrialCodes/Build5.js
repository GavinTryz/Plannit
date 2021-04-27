import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './calendar.css';
import Info5 from './Info5';

import {storeEventTable, storeEventData} from '../actions';
import {useDispatch, useSelector} from 'react-redux';
import InvitationPopover from '../components/InvitationPopover';


const jwt = require('jsonwebtoken');

function Build5(props){

    const storage = require('../tokenStorage');
    const bp = require('../components/bp');
    const dispatch = useDispatch();

    const [calendar, setCalendar] = useState(createCalendar(false));
    const [particpantArr, setparticpantArr] = useState(createCalendar(null));

    // Objects received from SetCalendar.js
    var dayOfWeekObj = props.daysAvailable;
    var timeObj = props.time;

    //test example 
    /*var avail1 = createCalendar(false); //rob
    var avail2 = createCalendar(true);  //bob

    dispatch(storeEventData({participants: ["rob robby", "bob bobby"], availability: [avail1, avail2]}));
    */

    const names = useSelector(state => state.eventData.participants);
    const availability = useSelector(state => state.eventData.availability);

    function createCalendar(value) {
        const rows = 7;
        const cols = 48;

        const nestedArray = Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => value)
        );
        return nestedArray;
    }

   var daysOfWeek = ['Time', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];     //keep cal the same?

    var tableCell = (dayOfWeekObj, timeObj, nameofDay) =>{
        if (dayOfWeekObj === true)
            return(
                <tr>
                    <Info5 time={timeObj} day={nameofDay} calendar={calendar} setCalendar={setCalendar}/>
                    <Info5 time={timeObj +  ':30'} day={nameofDay} calendar={calendar} setCalendar={setCalendar} userAvail={availability}/>
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
                <td className='calendarTd'>{tableCell(dayOfWeekObj[0], timeObj, 'Sunday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj[1], timeObj, 'Monday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj[2], timeObj, 'Tuesday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj[3], timeObj, 'Wednesday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj[4], timeObj, 'Thursday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj[5], timeObj, 'Friday')}</td>
                <td className='calendarTd'>{tableCell(dayOfWeekObj[6], timeObj, 'Saturday')}</td>
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

//Populates participant names in table
    useEffect(()=>{
        var newCalendar = particpantArr;
        var avail = availability;
        var name = names;

        if (avail != null){
            for (var k = 0 ; k < avail.length ; k++) {
                for (var i = 0 ; i < avail[0].length ; i++) {
                    for (var j = 0 ; j < avail[0][1].length ; j++) {
                        if (availability[k][i][j] === true) {
                            var curNames = newCalendar[i][j];
                            if (curNames === null)
                                curNames = name[k];
                            else
                                curNames = curNames + " " + name[k];

                            newCalendar[i][j] = curNames;
                            
                            setparticpantArr(newCalendar);
                        }
                    }
                }
            }
        }
        //console.log(newCalendar);
        dispatch(storeEventTable(newCalendar));
    }, [])

    return(
        <div>
            <InvitationPopover />
            <table className = 'calendarTable'>
                {daysOfWeek.map(tableHeader)}
                {timeObj.map(makecolumns)}   
            </table>
            
            <button /*onClick={handleSubmit}*/>
                Set Event Time (api not connected yet; empty button)
            </button>
        </div> 
       );
}
export default Build5;