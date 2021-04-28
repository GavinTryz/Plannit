import React, {useEffect, useState} from 'react';
import DeleteEventBtn from './DeleteEventBtn';

import {useSelector, useDispatch} from 'react-redux';
import {storeCreatorEvents, storeParticipantEvents, storeJWT, storeEventData} from '../actions';

import SearchEvent from './SearchEvent';
import LeaveEventBtn from './LeaveEventBtn';
import axios from 'axios';

export default function RetrieveEvent(){

    const [searchValue, setSearchValue] = useState("");
    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState(true);
    const [showEvents, setShowEvents] = useState(false);
    const storage = require('../tokenStorage');
    const bp = require('./bp');
    const jwt = require('jsonwebtoken');
    var tok = storage.retrieveToken();
    const dispatch = useDispatch();

    useEffect(() => {
        const payload = {
            userID: jwt.decode(tok).userId,
            jwtToken: tok
        };
        axios.post(bp.buildPath('api/getEvents'), payload)
        .then((res) => {
            setEvents(res.data.participantEvents);
            setLoading(false);
        })
        .catch((e) => {
            console.log(e);
        })

    }, [])

    function handleShowEventsClick(event) {
        event.preventDefault();
        setShowEvents(!showEvents);
    }
    function handleEventClick(event) {
        event.preventDefault();
        const payload = {
            eventID: event.target.getAttribute("itemindex"),
            jwtToken: tok
        };
        axios.post(bp.buildPath('api/viewEvent'), payload)
        .then((res) => {
            dispatch(storeEventData(res.data));
            window.location.href = '/dashboard/viewEvents';
        })
        .catch((e) => {
            console.log(e);
        })
    }
    function handleSearch(event) {
        event.preventDefault();
        setSearchValue(event.target.value);
        setShowEvents(true);
        const payload = {
            userID: jwt.decode(tok).userId,
            name: event.target.value,
            jwtToken: tok
        };
        axios.post(bp.buildPath('api/searchEvents'), payload)
            .then((res) => {
                setEvents(res.data.participantEvents);
                dispatch(storeJWT(res.data.jwtToken));
                // dispatch(storeSearchEvents(res.data.creatorEvents));
                // dispatch(storeSearchInvites(res.data.participantEvents));
            })
            .catch((e) => {
                console.log(e);
            })
    }
    return(
        <div>
        {
            !loading &&
            <div>
            <button className="SideBarBtn" onClick={handleShowEventsClick}>Show My Events</button> 
            <input className="search" type="text" value={searchValue} placeholder="Search events..." name="search" onChange={handleSearch} />
            {
                showEvents && events &&
                <table class = 'events'> 
                {
                    events.map((item) => 
                        <tr><td className='eventRow'><button className='eventsBtn' itemindex={item.eventID} onClick={handleEventClick}>{item.eventName}</button><DeleteEventBtn eventID={item.eventID} /></td></tr>
                    )
                }
                </table>
            }
            </div>
        }
        </div>
    );
}
    

