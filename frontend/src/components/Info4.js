import React, {useState, useEffect} from 'react'
import './calendar.css';

//import {storeViewSlot, slotState} from '../actions';
import {useDispatch, useSelector} from 'react-redux';

function Info4(props){

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


    /*function toggleHover() { 
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
    }*/


    //IDEA FOR FILLING TABLE FOR AVAILABILITY
    /* if dbAvailabilityTable[][] == true
        opacity = 1
    else
        opacity = 0
    
    if eventNamesTable[][] != null      (from contenteditable CSS)
        fill <span> or use inner.html located within the specific cell with eventNamesTable[][]
    */

    const eventTable = useSelector(state => state.eventTable);  //CHANGE TO ACTUAL API RESPONSE
    const myWeek = useSelector(state => state.myWeek);
    
    const [slotOpacity, setSlotOpacity] = useState(0);
    function fillTable () {
        var arr = props.time.toString().split(':');
        var dayIndex = arr[0]*2;
        if(arr.length == 2)
        {
            dayIndex++;
        }

        if (myWeek[stringToInt(props.day)][dayIndex] != false)   //CHANGE TO != false
            setSlotOpacity(1)
    }

    useEffect( () => {
        if (myWeek != null)
        fillTable();
    }, [])

    return(
        <tr>
            <label className = "calendarViewCell" style={{opacity: slotOpacity}}>
            <span className = "calendarCellOn"/>
            </label>
        </tr>
    );
}
export default Info4;