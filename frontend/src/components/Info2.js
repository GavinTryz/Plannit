import React, {useState, useEffect} from 'react'
import './calendar.css';

import {storeViewSlot, slotState} from '../actions';
import {useDispatch, useSelector} from 'react-redux';

function Info2(props){
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

    function handleChange(event)
    {
        var newCalendar = props.calendar;
        var arr = props.time.toString().split(':');
        var dayIndex = arr[0]*2;
        if(arr.length == 2)
        {
            dayIndex++;
        }
        newCalendar[stringToInt(props.day)][dayIndex] = event.target.checked;

        props.setCalendar(newCalendar);   

        console.log(newCalendar);

        if (slotOpacity != 1)
            setSlotOpacity(1);
        else 
            return changeOpacity();     ///edit
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

    const [slotOpacity, setSlotOpacity] = useState(0);
    const eventTable = useSelector(state => state.eventTable);
    var ratio = 0;

    function changeOpacity() {        //will have to adjust to take tokens given by db
        var arr = props.time.toString().split(':');
        var dayIndex = arr[0]*2;
        if(arr.length == 2)
        {
            dayIndex++;
        }

        if (eventTable == null)
            return setSlotOpacity(0);

        var list = eventTable[stringToInt(props.day)][dayIndex];
        if (  list === "" || list === null)
            setSlotOpacity(0)
        else {
            //calcOpacity(list);
            var numWords = (list.split(" ").length) / 2;
            var totalPeople = 5;   //example, change after db
            ratio = numWords/totalPeople;
            setSlotOpacity(ratio)
        }
    }

    useEffect( () => {
        changeOpacity();
    }, [])

    return(
        <tr>
            <label className = "calendarViewCell" style={{ opacity: slotOpacity }} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
            <input type="checkbox" onChange={handleChange}/>
            <span className = "calendarCellOn"/>
            </label>
        </tr>
    );
}
export default Info2;