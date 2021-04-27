import React, {useState, useEffect} from 'react'
import './calendar.css';

function EventCalendarCell(props){
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState(0);
    const jwt = require('jsonwebtoken');
    const storage = require('../tokenStorage');
    useEffect(() => {
        setValue(getValue(props.calendar));
        setLoading(false);
    }, [])
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
    // RN this function id for testing 
    function getValue(table)
    {
        var arr = props.time.toString().split(':');
        var dayIndex = arr[0]*2;
        if(arr.length == 2)
        {
            dayIndex++;
        }
        console.log(table[stringToInt(props.day)][dayIndex])
        return table[stringToInt(props.day)][dayIndex];
    }

    function handleChange(event)
    {
        var newCalendar = props.calendar;
        var slot = getValue(props.setCalendar);

        slot = event.target.checked;
        props.setCalendar(newCalendar);   
        
    }

    return(
    <div>
        {
            !loading &&
            <tr>
                <label className = "calendarCell">
                    <td style={{
                        border: "1px solid black",
                        width: "85px",
                        height: "15px",
                        background: "hsl(200, 50%, " + (100-(value/props.numParticipants*100)) + "%)"
                    }}></td>
                    <input type="checkbox" onChange={handleChange}/>
                    {/* <td style={'background: hsl(' + value + ', 100%, 50%)'}> {value}</td> */}
                    {/* <span className="calendarCellOn"/> */}
                </label>
            </tr>
        }
    </div>
        
    );
}
export default EventCalendarCell;