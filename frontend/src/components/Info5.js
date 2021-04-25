import React, {useState, useEffect} from 'react'
import './calendar.css';

import {storeList} from '../actions';
import {useDispatch, useSelector} from 'react-redux';

function Info5(props){
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

        //console.log(newCalendar);

        if (slotOpacity != 1)
            setSlotOpacity(1);
        else 
            return changeOpacity();
    }

    function setList() {
        if (eventTable === null || eventTable === undefined)
            return ;
        else{
            var arr = props.time.toString().split(':');
            var dayIndex = arr[0]*2;

            if (arr.length == 2) {
                dayIndex++;
            }
            var list = eventTable[stringToInt(props.day)][dayIndex];

            if (list != undefined)
                dispatch(storeList(list));
        }
    }

    function clearList() {
        if (eventTable != null)
            dispatch(storeList(null));
    }

    const [slotOpacity, setSlotOpacity] = useState(0);
    const eventTable = useSelector(state => state.eventTable);
    const eventData = useSelector(state => state.eventData);
    var ratio = 0;

    function changeOpacity() {
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

            if (eventData.availability.length != nulll)
                var totalPeople = eventData.availability.length;
            else
                var totalPeople = 1;

            ratio = numWords/totalPeople;
            setSlotOpacity(ratio)
        }
    }

    useEffect( () => {
        changeOpacity();
    }, [])

    return(
        <tr>
            <label className = "calendarViewCell" style={{ opacity: slotOpacity }} onMouseEnter={setList} onMouseLeave={clearList}>

            <input type="checkbox" onChange={handleChange}/>
            <span className = "calendarCellOn"/>
            </label>
        </tr>
    );
}
export default Info5;