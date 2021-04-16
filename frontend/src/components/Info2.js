import React, {useState} from 'react'
import './calendar.css';

import {storeViewSlot, slotState} from '../actions';
import {useDispatch, useSelector} from 'react-redux';

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

    const hover = useSelector(state => state.slotState); 
    function toggleHover() { 
        dispatch(slotState());

        if (!hover) {
            var arr = props.time.toString().split(':');
            var dayIndex = arr[0]*2;

            if (arr.length == 2) {
                dayIndex++;
            }

            //store index
            dispatch(storeViewSlot({row: stringToInt(props.day), col: dayIndex}) );
        }
    }

    return(
        <tr>
            <label className = "calendarViewCell" onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
            <span className = "calendarCellOn"/>
            </label>
        </tr>
    );
}
export default Info2;