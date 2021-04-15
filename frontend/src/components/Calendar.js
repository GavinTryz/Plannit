import React from 'react';
import './InternalMenuBar.css'

function Calendar(){


    var weekDaysObj = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    var days = (weekDaysObj, i) =>{
     
        return(
                <td key={i} className = 'rowsAlignment'>{weekDaysObj}</td>
        );
    }

    return(
        <div>
            <table className="calendar">
            <tr>
            <td Time></td>
            {weekDaysObj.map(days)}
            </tr>
            </table> 
        </div>
    
    );

}

export default Calendar;