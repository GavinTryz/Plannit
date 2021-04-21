import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {storeMyWeek} from '../actions';

function linkChange(){
    window.location.href = '/dashboard/viewWeek'
}

function TypicalWeekButton()
{
    const dispatch = useDispatch();
    const bp = require('./bp.js');

    //const {userID, jwtToken} = req.body;
    const userData = useSelector(state => state.userData);
    const userJWT = useSelector(state => state.userJWT); 

    const getWeek = async event => {
        event.preventDefault();
        
        var obj = {
            userID: userData.userId,
            jwtToken: userJWT
        };
        var js = JSON.stringify(obj);

        //api reference : json({week: results[0].week, names: results[0].names, error: "", jwtToken: newToken});

        try
        {
            const response = await fetch(bp.buildPath('api/getWeek'),
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            dispatch(storeMyWeek(res.week));
            linkChange();
        }

        catch(e)
        {
            alert(e.toString());
            return;
        }
    };


    return(  
        <div>
            <button onClick={getWeek}>Typical Week</button>
        </div>
    )
}
export default TypicalWeekButton;