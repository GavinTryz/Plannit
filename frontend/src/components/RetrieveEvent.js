import React, {useEffect, useState} from 'react';
import DeleteEventBtn from './DeleteEventBtn';

import {useSelector, useDispatch} from 'react-redux';
import {storeCreatorEvents, storeParticipantEvents, storeJWT, storeEventData} from '../actions';

import SearchEvent from './SearchEvent';

function RetrieveEvent(){
    
    const[eventLists, setEventLists] = useState("");
    const[invitedList, setInvitedList] = useState("");
    const[showEventList, setShowEventList] = useState(false);
    const[myEvents, setMyEvents] = useState([{}]);
    const[myInvitedEvents, setMyInvitedEvents] = useState([{}])
    useEffect(() => {
        loadEvents();
    }, [])
    const storage = require('../tokenStorage');
    const bp = require('./bp');
    const jwt = require('jsonwebtoken');
    var tok = storage.retrieveToken();
    var ud = jwt.decode(tok, {complete: true});
    const dispatch = useDispatch();

    async function loadEvents() {
        var obj = {
            userID: jwt.decode(tok).userId,
            jwtToken: tok
        };
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(bp.buildPath('api/getEvents'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                
            var res = JSON.parse(await response.text());
            // Get only the object array named CreatorEvents
            setMyEvents(res.creatorEvents);
            setMyInvitedEvents(res.participantEvents);
            dispatch(storeJWT(res.jwtToken));
            dispatch(storeCreatorEvents(res.creatorEvents));
            dispatch(storeParticipantEvents(res.participantEvents));
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    }
    function showEvents() {
        setEventLists(myEvents.map(generateEventsList));
        setInvitedList(myInvitedEvents.map(generateInvitedList));
        setShowEventList(true);
    }

    const invitedEvents = useSelector(state => state.participantEvents);
    function getEventId (key, list) {
        var eventId = list[key]._id;
        return eventId;
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

    function generateEventsList (getInvitedEvents, i) {
        return(
            <table class = 'events'>
                <tr key={i}>
                    <td className = 'eventButton'><button onClick={loadEventData(i, myEvents)}>{getInvitedEvents.eventName}</button><DeleteEventBtn eventKey = {i}/></td>

                </tr>
            </table>
        );
    }

    function generateInvitedList (getCreatorEvents, i) {
        return(
            <table class = 'events'>
                <tr key={i}>
                    <td className = 'eventButton'><button onClick={loadEventData(i, invitedEvents)}>{getCreatorEvents.eventName}</button><DeleteEventBtn eventKey = {i}/></td>

                </tr>
            </table>
        );
    }

    return(
        <div>
            
            <button className="SideBarBtn" onClick={showEvents}>Show My Events</button> 
            {showEventList &&
            eventLists}
            <br />
            {showEventList &&
            invitedList}
            <SearchEvent />
        </div>
    );
}
export default RetrieveEvent;
