import React from 'react';
import bp from './bp';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {storeJWT} from '../actions';


function SetTimeBtn(props)
{
    const dispatch = useDispatch();

    const eventData = useSelector(state => state.eventData);
    const userJWT = useSelector(state => state.userJWT); 

    const handleSubmit = async event => {

        event.preventDefault();
  
        var obj = {
            eventTime: props.finalTimes, 
            eventID: eventData.eventID, 
            jwtToken: userJWT
        };
        var js = JSON.stringify(obj);

        console.log(obj);
  
        try
        {    
            const response = await fetch(bp.buildPath('api/chooseTime'),
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

    return(
        <button onClick={handleSubmit}>
            Set Event Time
        </button>
    );
}
export default SetTimeBtn;



