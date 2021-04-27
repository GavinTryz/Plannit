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

    function handleFullDay()
    {
        var fullTimeArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ,21 ,22, 23, 24];

        dispatch(setWeekTime(fullTimeArr));

        // window.location.reload();
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