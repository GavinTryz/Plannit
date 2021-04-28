import React, {useState} from 'react';

import DeleteEventBtn from './DeleteEventBtn';

import {useSelector, useDispatch} from 'react-redux';
import {storeSearchEvents, storeJWT, storeEventData, storeSearchInvites} from '../actions';


const SearchEvent = () =>
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


    const handleSearch = async event => {

        event.preventDefault();

        var obj = {
            userID: jwt.decode(tok).userId,
            name: searchEvent.value,
            jwtToken: tok
        };
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(bp.buildPath('api/searchEvents'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                
            var res = JSON.parse(await response.text());
       
            setMyEvents(res.creatorEvents);
            setMyInvitedEvents(res.participantEvents);

            dispatch(storeJWT(res.jwtToken));
            dispatch(storeSearchEvents(res.creatorEvents));
            dispatch(storeSearchInvites(res.participantEvents));

            showEvents();
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
                 <form onChange={handleSearch}>
                 <input className="search" type="text" placeholder="Search events..." name="search" ref={(c) => searchEvent = c} />
                 </form>
                 {showEventList &&
                eventLists}
                <br />
                {showEventList &&
                invitedList}
        </div>

    );
};
export default SearchEvent;