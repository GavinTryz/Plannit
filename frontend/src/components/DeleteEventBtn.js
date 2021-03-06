import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {storeJWT} from '../actions';
import {TiDelete} from 'react-icons/ti';
import '../index.css';

function DeleteEventBtn(props)
{
    const dispatch = useDispatch();
    const bp = require('./bp');

    const userJWT = useSelector(state => state.userJWT); 
    const myEvents = useSelector(state => state.myEvents);
    var key = props.eventKey;

    function getEventId (key) {
        var eventId = myEvents[key]._id;
        console.log(eventId);
        return eventId;
    }

    const leaveEvent = async event => {
        event.preventDefault();

        var eventId = getEventId(key);
        
        var obj = {
            eventID: eventId,
            jwtToken: userJWT
        };
        var js = JSON.stringify(obj);
        
        console.log(obj);

        try
        {
            const response = await fetch(bp.buildPath('api/deleteEvent'),
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            dispatch(storeJWT(res.jwtToken));
            window.location.reload(false);
        }

        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    return (
        <button class="deleteBtn" onClick={leaveEvent}>
            <TiDelete />
        </button>
    )
}
export default DeleteEventBtn;
