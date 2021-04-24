import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {storeJWT} from '../actions';
import {TiDelete} from 'react-icons/ti';

function deleteEventBtn(props)
{
    const dispatch = useDispatch();

    const userData = useSelector(state => state.userData);
    const userJWT = useSelector(state => state.userJWT); 
    var key = props.eventKey;
    var eventId = getEventId(key);

    function getEventId (key) {
        var eventId = myEvents[key]._id;
        console.log(eventId);
        return eventId;
    }

    const leaveEvent = async event => {
        event.preventDefault();
        
        var obj = {
            eventID: eventId,
            userID: userData.userId,
            jwtToken: userJWT
        };
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(bp.buildPath('api/leaveEvent'),
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            dispatch(storeJWT(res.jwtToken));
        }

        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    return <button class="deleteBtn" onClick={leaveEvent}><TiDelete /></button>;
}
export default deleteEventBtn