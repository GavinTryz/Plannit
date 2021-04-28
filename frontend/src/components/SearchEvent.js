import React, {useState} from 'react';

import DeleteEventBtn from './DeleteEventBtn';

import {useSelector, useDispatch} from 'react-redux';
import {storeSearchEvents, storeJWT, storeEventData, storeSearchInvites} from '../actions';
import axios from 'axios';
import { PromiseProvider } from 'mongoose';


export default function SearchEvent(props)
{
    const storage = require('../tokenStorage');
    const bp = require('./bp');
    const jwt = require('jsonwebtoken');
    var tok = storage.retrieveToken();
    var ud = jwt.decode(tok, {complete: true});
    var searchEvent;
    const dispatch = useDispatch();

    const[showEventList, setShowEventList] = useState(false);
    const[eventLists, setEventLists] = useState("");
    const[invitedList, setInvitedList] = useState("");
    const searchInvites = useSelector(state => state.searchInvites);
    const searchEvents = useSelector(state => state.searchEvents);
    const[myEvents, setMyEvents] = useState([{}]);
    const[myInvitedEvents, setMyInvitedEvents] = useState([{}])
    const [value, setValue] = useState("");

    function handleSearch(event) {

        event.preventDefault();
        setValue(event.target.value);
        if(event.target.value)
        {
            props.hide(false);
        }
        var obj = {
            userID: jwt.decode(tok).userId,
            name: event.target.value,
            jwtToken: tok
        };
        var js = JSON.stringify(obj);

        try
        {    
            axios.post(bp.buildPath('api/searchEvents'), obj)
            .then((res) => {
                setMyEvents(res.data.creatorEvents);
                setMyInvitedEvents(res.data.participantEvents);
                dispatch(storeJWT(res.data.jwtToken));
                dispatch(storeSearchEvents(res.data.creatorEvents));
                dispatch(storeSearchInvites(res.data.participantEvents));
                showEvents();
            })
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    }

    //adjusted to be all events

    function getEventId (key, list) {
        var eventId = list[key]._id;
        return eventId;
    }

    function showEvents() {
        setEventLists(myEvents.map(generateEventsList));
        setInvitedList(searchEvents.map(generateInvitedList));
        setShowEventList(true);
    }


    const loadEventData = (key, list) => async event => {
        event.preventDefault();

        var eventId = getEventId(key, list);

        var obj = {
            eventID: eventId,
            jwtToken: tok
        };

        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(bp.buildPath('api/viewEvent'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                
            var res = JSON.parse(await response.text());

            dispatch(storeEventData(res));

            window.location.href = '/dashboard/viewEvents';
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    }



    function generateEventsList (getCreatorEvents, i){
        return(
            <table class = 'events'>
                <tr key={i}>
                    <td className = 'eventButton'><button onClick={loadEventData(i, searchEvents)}>{getCreatorEvents.eventName}</button><DeleteEventBtn eventKey = {i}/></td>
                </tr>
            </table>
        );
    }

    function generateInvitedList (getCreatorEvents, i) {
        return(
            <table class = 'events'>
                <tr key={i}>
                    <td className = 'eventButton'><button onClick={loadEventData(i, searchInvites)}>{getCreatorEvents.eventName}</button><DeleteEventBtn eventKey = {i}/></td>
                </tr>
            </table>
        );
    }

    return(
        <div className="search-container">
                 <form>
                    <input className="search" type="text" value={value} placeholder="Search events..." name="search" onChange={handleSearch} />
                 </form>
                 {showEventList &&
                eventLists}
                <br />
                Invited Events
                {showEventList &&
                invitedList}
        </div>

    );
};
