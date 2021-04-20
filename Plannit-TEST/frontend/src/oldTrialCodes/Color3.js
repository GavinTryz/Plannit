//import e from 'cors';
import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux';
import './calendar.css';

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
function Color2(props){
    const [slotOpacity, setSlotOpacity] = useState(1);
    const eventTable = useSelector(state => state.eventTable);

    useEffect(()=>{
        //function changeOpacity() {        //will have to adjust to take tokens given by db
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
                var numWords = (list.split(" ").length) / 2;
                var totalPeople = 5;   //example, change after db
                var ratio = numWords/totalPeople;
                setSlotOpacity(ratio)
            }
        //}
    }, [])
    
    return(
        <tr>
            <label className = "calendarCell"  style={{ background:'blue', opacity: slotOpacity }}>
            <span className="calendarCellOn"/>
            </label>
        </tr>
    );
}
export default Color2;