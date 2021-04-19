import React, { useState } from 'react';
import "./Week.css"

function EventWeek()
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