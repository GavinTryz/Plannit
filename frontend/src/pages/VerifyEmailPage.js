// pass daysAvailabble: sunday -> saturday true or false
// pass time: array of integers (0-23)
import React, {useState, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

require('dotenv').config();
const jwt = require('jsonwebtoken');

export default function InviteUserPage(){
    const [error, setError] = useState("");
    const {search} = useLocation();
    const values = queryString.parse(search);
    const bp = require('../components/bp.js');
    let history = useHistory();
    useEffect(() => {
        axios.post(bp.buildPath('api/verifyEmail'), {token: values.token})
        .then((res) => {
            history.push("/login")
        })
        .catch((error) => {
            setError("Error: please retry");
        });
    }, []);

    return(
        <h1>
            {
                error
            }
        </h1>
        );
}
