// pass daysAvailabble: sunday -> saturday true or false
// pass time: array of integers (0-23)
import React, {useState, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import RetrieveCalendar from '../components/RetrieveCalendar';
import axios from 'axios';
import queryString from 'query-string';
import {useSelector} from 'react-redux';


require('dotenv').config();
const jwt = require('jsonwebtoken');

export default function InviteUserPage(props){
    let history = useHistory();
    const [loading, setLoading] = useState(true);
    const [calendar, setCalendar] = useState(createCalendar());
    const {search} = useLocation();
    const values = queryString.parse(search);
    const bp = require('../components/bp.js');

    const login = useSelector(state => state.login);
    const userJWT = useSelector(state => state.userJWT); 
    const createId = useSelector(state => state.createId); 
    const createName = useSelector(state => state.createName); 
    const userData = useSelector(state => state.userData); 
    var timeArr = [];

    useEffect(() => {
        if(values.token)
        {
            axios.post(bp.buildPath('api/getWeekFromToken'), {token: values.token})
            .then((res) => {
                console.log(res);
                if(!res.data.error)
                {
                    setCalendar(res.data.week);
                }
                console.log(calendar);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
        }
        else 
        {
            const payload = {
                userID: userData.userId,
                jwtToken: userJWT
            }
            axios.post(bp.buildPath('api/getWeek'), payload)
            .then((res) => {
                console.log(res);
                if(!res.data.error)
                {
                    setCalendar(res.data.week);
                }
                console.log(calendar);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
        }
        
    }, []);
    function createCalendar() {
        const rows = 7;
        const cols = 48;

        const nestedArray = Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => false)
        );
        return nestedArray;
    }
    var dayOfWeekObj = {
        sunday: true,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true
    };

    function fullHours(){
        var adjustedTime = timeArr;
        for ( var i = 0 ; i < 24 ; i++ ){
            adjustedTime.push(i);
        }
        return adjustedTime;
    }

    function handleSubmit(e) {
        e.preventDefault();

        var payload = {};

        if (login) {    //if user is logged in
            payload = {
                availability: calendar,
                jwtToken: userJWT,
                eventID: createId,
                eventName: createName
            }
        } else {
            payload = {
                token: values.token,
                availability: calendar
            }
        }

        axios.post(bp.buildPath('api/joinEvent'), payload)
        .then((res) => {
            console.log(res);
            if (login)
                history.push('/dashboard');
            else
                history.push('/login');
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return(
        <div className="stylePage">
            <div><br/>
            {!loading &&
                <RetrieveCalendar
                daysAvailable = {dayOfWeekObj}
                time = {fullHours()}
                calendar = {calendar}
                setCalendar = {setCalendar}
                handleSubmit = {handleSubmit}
            />
            }
            {loading &&
                <div>loading</div>
            }
            </div>
        </div>
        );
}
