import React, {useState, useEffect} from 'react';
import './Main.css'
import RetrieveCalendar from './RetrieveCalendar';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {setClearWeekTrue, setClearWeekFalse, setWeekTime} from '../actions';

export default function MainSetWeek() {
    const jwt = require('jsonwebtoken');
    const storage = require('../tokenStorage');
    const bp = require('./bp');
    const [calendar, setCalendar] = useState(createCalendar());
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const clearWeek = useSelector(state => state.clearWeek);
    const weekTime = useSelector(state => state.weekTime);
    const eventData = useSelector(state => state.eventData);
    var dayOfWeekObj = eventData.daysOfWeek;
    useEffect(() => {
        setLoading(true);
        console.log('using effect');
        var tok = storage.retrieveToken();
        axios.post(bp.buildPath('api/getWeek'), {userID: jwt.decode(tok).userId, jwtToken: tok})
        .then((res) => {
            console.log(res);
            if(!res.data.error)
            {
                if (clearWeek)
                {
                    setCalendar(calendar);
                    dispatch(setClearWeekFalse());
                }
                else
                {
                    setCalendar(res.data.week);
                }
            }
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });

    }, []);
    
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

    function getEarliestStartTime() {
        var earlySlot = 47, startTime, cols, rows;

        for (cols = 0; cols < calendar.length; cols++){
            for (rows = 0; rows < calendar[0].length; rows++){
                if (calendar[rows][cols] == true) {
                    if (rows < earlySlot){
                        startTime = rows;
                        break;
                    }
                }
            }
        }

        if (startTime % 2)
            startTime =  Math.floor(rows / 2);
        else
            startTime = startTime / 2;

        return startTime;
    }

    /*function getLatestEndTime() {
        var lateSlot = 0, endTime, cols, rows;

        for (cols = 0; cols < calendar.length; cols++) {
            for (rows = (calendar[0].length - 1); rows >= 0; rows--) {
                if (calendar[rows][cols] == true) {
                    if (rows > lateSlot) {
                        startTime = rows;
                        break;
                    }

                    currentHour = Math.floor(rows / 2);
                    if (currentHour > endTime)
                    {
                        endTime = currentHour;
                        break;
                    }
                }
            }
        }
        return endTime;
    }*/

    function makeTimeArr(startTime, endTime)
    {
        var timeDiff = endTime - startTime;
        var timeArr = [];
        var i;
        for (i = 0; i < timeDiff; i++)
        {
            timeArr[i] = startTime + i;
        }

        dispatch(setWeekTime(timeArr));

        window.location.reload();
    }

    function handleFullDay()
    {
        makeTimeArr(0, 24);
    }

    function clearBtn()
    {
        dispatch(setClearWeekTrue());
        window.location.reload();
    }

    return(
        <div class="main">
            {
                !loading &&
                <RetrieveCalendar
                    daysAvailable = {dayOfWeekObj}
                    time = {weekTime}
                    calendar = {calendar}
                    setCalendar = {setCalendar}
                    handleSubmit = {handleSubmit}
                />
            }
            <button onClick={handleFullDay}>Show Full Day</button>
            <button onClick={clearBtn}>Clear</button>
        </div>
        
        );
}