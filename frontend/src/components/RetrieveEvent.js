import React, {useState} from 'react';
import DeleteEventBtn from './DeleteEventBtn';

import {useSelector, useDispatch} from 'react-redux';
import {storeCreatorEvents, storeParticipantEvents, storeJWT, storeEventData} from '../actions';

import RetrieveCalendar from './RetrieveCalendar';
import SearchEvent from './SearchEvent';

function RetrieveEvent(){

    const[eventLists, setEventLists] = useState("");

    const storage = require('../tokenStorage');
    const bp = require('./bp');
    const jwt = require('jsonwebtoken');
    var tok = storage.retrieveToken();
    var ud = jwt.decode(tok, {complete: true});
    const dispatch = useDispatch();
  
    const showEvents = async event => {

        event.preventDefault();

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
            var getCreatorEvents = res.creatorEvents;


            setEventLists(getCreatorEvents.map(generateEventsList));

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

    const myEvents = useSelector(state => state.myEvents);
    function getEventId (key) {
        var eventId = myEvents[key]._id;
        return eventId;
    }

    const loadEventData = (key) => async event => {
        event.preventDefault();

        var eventId = getEventId(key);

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
                    <td className = 'eventButton'><button onClick={loadEventData(i)}>{getCreatorEvents.eventName}</button><DeleteEventBtn eventKey = {i}/></td>

                </tr>
            </table>
        );
    }

    return(
        <div>
           
            <button className="SideBarBtn" onClick={showEvents}>Show My Events</button> 
            {eventLists}
            <SearchEvent />
            
            {/*<button onClick={loadEventData(1)} >Show My Events</button>*/}
        </div>
    );
}
export default RetrieveEvent;
