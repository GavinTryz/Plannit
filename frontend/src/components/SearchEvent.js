import React, {useState} from 'react';

import DeleteEventBtn from './DeleteEventBtn';

import {useSelector, useDispatch} from 'react-redux';
import {storeSearchEvents, storeJWT, storeEventData} from '../actions';


const SearchEvent = () =>
{
    const storage = require('../tokenStorage');
    const bp = require('./bp');
    const jwt = require('jsonwebtoken');
    var tok = storage.retrieveToken();
    var ud = jwt.decode(tok, {complete: true});
    var searchEvent;
    const dispatch = useDispatch();

    const[eventLists, setEventLists] = useState("");

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

            var getCreatorEvents = res.creatorEvents;
       
            setEventLists(getCreatorEvents.map(generateEventsList));

            dispatch(storeJWT(res.jwtToken));
            dispatch(storeSearchEvents(res.creatorEvents));
            dispatch(storeSearchEvents(res.participantEvents));
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    }

    //adjusted to be all events
    const searchEvents = useSelector(state => state.searchEvents);
    function getEventId (key) {
        var eventId = searchEvents.arr[0][key]._id;
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

    // function generateEventsList (getCreatorEvents, i){
    //     return(
    //         <table class = 'events'>
    //             <tr key={i}>
    //                 <td className = 'eventButton'><button>{getCreatorEvents.eventName}</button></td>
    //             </tr>
    //         </table>
    //     );
    // }

    return(
        <div className="search-container">
                 <form onSubmit={handleSearch}>
                 <input type="text" placeholder="Search events..." name="search" ref={(c) => searchEvent = c} />
                 </form>
                 {eventLists}
        </div>

    );
};
export default SearchEvent;
