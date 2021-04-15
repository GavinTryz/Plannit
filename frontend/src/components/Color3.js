import e from 'cors';
import React, {useState} from 'react'
import './calendar.css';

function Color2(props){
    const jwt = require('jsonwebtoken');
    const storage = require('../tokenStorage');
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
    function handleChange(event)
    {
        var tok = jwt.decode(storage.retrieveToken());
        //console.log(tok.userId);
        var newCalendar = props.calendar;
        var arr = props.time.toString().split(':');
        var dayIndex = arr[0]*2;

        var names = props.names;

        if(arr.length == 2)
        {
            dayIndex++;
        }


        /*console.log(props.day);
        console.log(dayIndex);
        console.log(event.target.checked);*/
        newCalendar[stringToInt(props.day)][dayIndex] = event.target.checked;
        console.log(newCalendar);
        props.setCalendar(newCalendar);   
        //alert('selected hour is ' + props.time + 'and the day is ' + props.day);

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
        /*avail.forEach(function (item, index) {
            console.log(item, index);
          });*/

        

    }

    const [boxColor, setBoxColor] = useState(1);
    //const boxColor = 'red';
    

    function changeOpacity() {
        setBoxColor(0.1)
        console.log(boxColor)
    }
    

    return(
        <tr>

            {/*<label className = "calendarCell"><input type="checkbox" onChange={handleChange}/>*/}
            
            <label className = "calendarCell" onClick={changeOpacity} style={{ background:'blue', opacity: boxColor }}>
                {/*<input type="checkbox" onChange={changeOpacity}/>*/}
            <span className="calendarCellOn"/>
            </label>
         </tr>
    );
}
export default Color2;