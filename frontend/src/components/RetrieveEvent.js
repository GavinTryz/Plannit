import React, {useState} from 'react';
import RetrieveCalendar from './RetrieveCalendar';

function RetrieveEvent(){

    const[eventLists, setEventLists] = useState("");

    const storage = require('../tokenStorage');
    const bp = require('./bp');
    const jwt = require('jsonwebtoken');
    var tok = storage.retrieveToken();
    var ud = jwt.decode(tok, {complete: true});
  
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
                    <td className = 'eventButton'><button>{getCreatorEvents.eventName}</button></td>
                </tr>
            </table>
        );
    }

    return(
        <div>
            {eventLists}
            <button onClick={showEvents} >Show My Events</button>
        </div>
    );
}
export default RetrieveEvent;