import React from 'react'
import './calendar.css';

function CalendarInfoOnCell(props){

    // RN this function id for testing 
    function handleChange()
    {
        
        //alert('selected hour is ' + props.time + 'and the day is ' + props.day);

    }
    

    return(
        <tr>
            <label className = "calendarCell"><input type="checkbox" onChange={handleChange}/>
            <span className="calendarCellOn"/>
            </label>
         </tr>
    );
}
export default CalendarInfoOnCell;