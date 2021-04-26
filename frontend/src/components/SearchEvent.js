import React, {useState} from 'react';
import InternalMenuBar from '../components/InternalMenuBar';



const SearchEvent = () =>
{
    const storage = require('../tokenStorage');
    const bp = require('./bp');
    const jwt = require('jsonwebtoken');
    var tok = storage.retrieveToken();
    var ud = jwt.decode(tok, {complete: true});
    var searchEvent;

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

        
           

            // Get only the object array named CreatorEvents
            var getCreatorEvents = res.creatorEvents;
            console.log(getCreatorEvents[0].eventName);
            alert(getCreatorEvents[0].eventName);


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
                    <td className = 'eventButton'><button>{getCreatorEvents[i].eventName}</button></td>
                </tr>
            </table>
        );
    }

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
