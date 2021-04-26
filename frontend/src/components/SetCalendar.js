import React, {useState} from 'react';
import RetrieveCalendar from './RetrieveCalendar';
import axios from 'axios';

function SetCalendar(){
    const jwt = require('jsonwebtoken');
    const storage = require('../tokenStorage');
    const bp = require('./bp');
    const [calendar, setCalendar] = useState(createCalendar());
    function createCalendar() {
        const rows = 7;
        const cols = 48;

        const nestedArray = Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => false)
        );
        return nestedArray;
    }
    var dayOfWeekObj = {    //what days show on the calendar?
        sunday: true,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true
    };

    var timeArr = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];  //times that show on cal

    function handleSubmit(event){
        event.preventDefault();
        var tok = storage.retrieveToken();
        axios.post(bp.buildPath('api/createWeek'), {week: calendar, userID: jwt.decode(tok).userId, jwtToken: tok})
        .then((results) => {
            console.log(results);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return(
        <RetrieveCalendar
            daysAvailable = {dayOfWeekObj}
            time = {timeArr}
            calendar = {calendar}
            setCalendar = {setCalendar}
            handleSubmit = {handleSubmit}
        />
        );
}
export default SetCalendar;