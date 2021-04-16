import React, {useState} from 'react'
import './calendar.css';

import {storeEventTable, storeViewSlot} from '../actions';
import {useDispatch} from 'react-redux';

function Info2(props){
    const jwt = require('jsonwebtoken');
    const storage = require('../tokenStorage');

    //redux
    const dispatch = useDispatch();

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

    function addName() {
        var newCalendar = props.calendar;
        var avail = props.userAvail;
        var name = props.name;
        
        for (var i = 0 ; i < avail.length ; i++){
            for (var j = 0 ; j < avail.length ; j++){
                if(avail[i][j] === true) {
                    var curNames = newCalendar[i][j];
                    if(curNames === null)
                        curNames = name
                    else {
                    curNames = curNames + " " + name
                    }

                    newCalendar[i][j] = curNames;
                    console.log(newCalendar);

                    props.setCalendar(newCalendar);
                }
            }
        }
        dispatch(storeEventTable(newCalendar));
    }

    const [hovered, setHovered] = useState(false);
    function toggleHover() { 
        hovered == false ? setHovered(true) : setHovered(false);

        if(hovered === false){
            var arr = props.time.toString().split(':');
            var dayIndex = arr[0]*2;

            if(arr.length == 2)
            {
                dayIndex++;
            }

            //store index
            dispatch(storeViewSlot({row: stringToInt(props.day), col: dayIndex}) );
        }
    }

    return(
        <tr>
            <label className = "calendarCell" style={{ background:'blue'}} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
                <input type="checkbox" onChange={addName}/>

            <span className="calendarCellOn"/>
            </label>
         </tr>
    );
}
export default Info2;