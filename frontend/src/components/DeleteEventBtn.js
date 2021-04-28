import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {storeJWT} from '../actions';
import {TiDelete} from 'react-icons/ti';
import '../index.css';
import axios from 'axios';

function DeleteEventBtn(props)
{
    const dispatch = useDispatch();
    const bp = require('./bp');

    const userJWT = useSelector(state => state.userJWT); 
    const myEvents = useSelector(state => state.myEvents);
    const userData = useSelector(state => state.userData);
    const leaveEvent = async event => {
        event.preventDefault();
        const payload = {
            eventID: props.eventID,
            jwtToken: userJWT
        }
        axios.post(bp.buildPath('api/getCreator'), payload)
        .then((res) => {
            console.log("hello");
            console.log(res);
            dispatch(storeJWT(res.data.jwtToken));
            if(res.data.creatorID === userData.userID)
            {
                axios.post(bp.buildPath('api/deleteEvent'), )
                .then((res) => {
                    window.location.reload(false);
                })
            }
            else 
            {
                axios.post(bp.buildPath('api/leaveEvent'), )
                .then((res) => {
                    window.location.reload(false);
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    };

    return (
        <button class="deleteBtn" onClick={leaveEvent}>
            <TiDelete />
        </button>
    )
}
export default DeleteEventBtn;
