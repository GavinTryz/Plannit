import React, {useEffect, useState} from 'react';
import DeleteEventBtn from './DeleteEventBtn';

import {useSelector, useDispatch} from 'react-redux';
import {storeCreatorEvents, storeParticipantEvents, storeJWT, storeEventData} from '../actions';

import SearchEvent from './SearchEvent';
import LeaveEventBtn from './LeaveEventBtn';
import axios from 'axios';

export default function RetrieveEvent(){

    const [searchValue, setSearchValue] = useState("");
    const [creatorEvents, setCreatorEvents] = useState([]);
    const [invitedEvents, setInvitedEvents] = useState([]);
    const [searchEvents, setSearchEvents] = useState([]);

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
            setCreatorEvents(res.data.creatorEvents);
            setInvitedEvents(res.data.invitedEvents);
            setLoading(false);
        })
        .catch((e) => {
            console.log(e);
        })

    }, [])

    function handleShowEventsClick(event) {
        event.preventDefault();
        console.log(creatorEvents);
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
                setCreatorEvents(res.data.creatorEvents);
                setInvitedEvents(res.data.participantEvents);
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
                showEvents && creatorEvents &&
                   <table class='events'> 
                    {
                       creatorEvents.map((item) => 
                           <tr><td className='eventButton'><button itemindex={item._id} onClick={handleEventClick}>{item.eventName}</button></td></tr>
                        )
                    }
                   </table>
            }
            {
                showEvents && invitedEvents &&
                <div>
                <h2>Invited</h2>
                   <table class = 'events'> 
                    {
                       invitedEvents.map((item) => 
                           <tr><td className='eventButton'><button itemindex={item._id} onClick={handleEventClick}>{item.eventName}</button></td></tr>
                        )
                    }
                   </table>
                </div>  
            }
            </div>
        }
        </div>
    );
}
    // const[eventLists, setEventLists] = useState("");
    // const[invitedList, setInvitedList] = useState("");
    // const[showEventList, setShowEventList] = useState(false);
    // const[myEvents, setMyEvents] = useState([{}]);
    // const[myInvitedEvents, setMyInvitedEvents] = useState([{}]);
    // useEffect(() => {
    //     loadEvents();
    // }, [])
    // const storage = require('../tokenStorage');
    // const bp = require('./bp');
    // const jwt = require('jsonwebtoken');
    // var tok = storage.retrieveToken();
    // var ud = jwt.decode(tok, {complete: true});
    // const dispatch = useDispatch();

    // async function loadEvents() {
    //     var obj = {
    //         userID: jwt.decode(tok).userId,
    //         jwtToken: tok
    //     };
    //     var js = JSON.stringify(obj);

    //     try
    //     {    
    //         const response = await fetch(bp.buildPath('api/getEvents'),
    //             {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                
    //         var res = JSON.parse(await response.text());
    //         // Get only the object array named CreatorEvents
    //         setMyEvents(res.creatorEvents);
    //         setMyInvitedEvents(res.participantEvents);
    //         dispatch(storeJWT(res.jwtToken));
    //         dispatch(storeCreatorEvents(res.creatorEvents));
    //         dispatch(storeParticipantEvents(res.participantEvents));
    //     }
    //     catch(e)
    //     {
    //         alert(e.toString());
    //         return;
    //     }
    // }
    // function showEvents() {
    //     setEventLists(myEvents.map(generateEventsList));
    //     setInvitedList(myInvitedEvents.map(generateInvitedList));
    //     setShowEventList(true);
    // }

    // const invitedEvents = useSelector(state => state.participantEvents);
    // function getEventId (key, list) {
    //     var eventId = list[key]._id;
    //     return eventId;
    // }

    // const loadEventData = (key, list) => async event => {
    //     event.preventDefault();
    //     var eventId = getEventId(key, list);

    //     var obj = {
    //         eventID: eventId,
    //         jwtToken: tok
    //     };

    //     var js = JSON.stringify(obj);

    //     try
    //     {    
    //         const response = await fetch(bp.buildPath('api/viewEvent'),
    //             {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                
    //         var res = JSON.parse(await response.text());


    //         dispatch(storeEventData(res));

    //         window.location.href = '/dashboard/viewEvents';
    //     }
    //     catch(e)
    //     {
    //         alert(e.toString());
    //         return;
    //     }
    // }

    // function generateEventsList (getInvitedEvents, i) {
    //     return(
    //         <table class = 'events'>
    //             <tr key={i}>
    //                 <td className = 'eventButton'><button onClick={loadEventData(i, myEvents)}>{getInvitedEvents.eventName}</button><DeleteEventBtn eventKey = {i}/></td>

    //             </tr>
    //         </table>
    //     );
    // }

    // function generateInvitedList (getCreatorEvents, i) {
    //     return(
    //         <table class = 'events'>
    //             <tr key={i}>
    //                 <td className = 'eventButton'><button onClick={loadEventData(i, invitedEvents)}>{getCreatorEvents.eventName}</button><LeaveEventBtn eventKey = {i}/></td>

    //             </tr>
    //         </table>
    //     );
    // }

    // return(
    //     <div>
            
    //         <button className="SideBarBtn" onClick={showEvents}>Show My Events</button> 
    //         <SearchEvent hide={setShowEventList}/>
    //         {showEventList &&
    //         eventLists}
    //         <br />
    //         {showEventList &&
    //         invitedList}
    //     </div>
    // );


