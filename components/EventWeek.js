import React, { useState } from 'react';
import "./Week.css"

// Select the days of the week for the event

function EventWeek(props)
{
    return(
        <span>
            <label className = "weekBtn">
            <input type="checkbox" value='' onChange={props.onChange}/>
            <span id= {props.day} className="weekBtnON"/>
            </label>
        </span>
 );
}

export default EventWeek;


{/* ============================== OLD CODE. STILL TESTING NEW CODE ========================================

function EventWeek(props)
{
    return(
        <span>
            <label className = "weekBtn">
            <input type="checkbox"/>
            <span id= "Sunday" className="weekBtnON"/>
            </label>

            <label className = "weekBtn">
            <input type="checkbox"/>
            <span id= "Monday" className="weekBtnON"/>
            </label>

            <label className = "weekBtn">
            <input type="checkbox"/>
            <span id="Tuesday" className="weekBtnON"/>
            </label>
            
            <label className = "weekBtn">
            <input type="checkbox"/>
            <span id="Wednesday" className="weekBtnON"/>
            </label>

            <label className = "weekBtn">
            <input type="checkbox"/>
            <span id="Thursday" className="weekBtnON"/>
            </label>

            <label className = "weekBtn">
            <input type="checkbox"/>
            <span id="Friday" className="weekBtnON"/>
            </label>

            <label className = "weekBtn">
            <input type="checkbox"/>
            <span id="Saturday" className="weekBtnON"/>
            </label>
        </span>
    );
}

export default EventWeek;
*/}
