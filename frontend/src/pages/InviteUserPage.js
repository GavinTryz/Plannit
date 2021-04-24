// pass daysAvailabble: sunday -> saturday true or false
// pass time: array of integers (0-23)
import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import RetrieveCalendar from '../components/RetrieveCalendar';
import axios from 'axios';
import queryString from 'query-string';

require('dotenv').config();
const jwt = require('jsonwebtoken');

export default function InviteUserPage(props){
    const [loading, setLoading] = useState(true);
    const [calendar, setCalendar] = useState(createCalendar());
    const {search} = useLocation();
    const values = queryString.parse(search);
    const bp = require('../components/bp.js');
    useEffect(() => {
        axios.post(bp.buildPath('api/getWeekFromToken'), {token: values.token})
        .then((res) => {
            console.log(res);
            setCalendar(res.data.week);
            console.log(calendar);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
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

    var timeArr = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];  //times that show on cal
    function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            token: values.token
        }
        axios.post(bp.buildPath('api/joinEvent'), payload)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return(
        <div>
            {!loading &&
                <RetrieveCalendar
                daysAvailable = {dayOfWeekObj}
                time = {timeArr}
                calendar = {calendar}
                setCalendar = {setCalendar}
                handleSubmit = {handleSubmit}
            />
            }
            {loading &&
                <div>loading</div>
            }
        </div>
        );
}
