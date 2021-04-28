import React, {useState, useEffect} from 'react';
import bp from './bp';
import './Main.css'
import {useSelector} from 'react-redux';
import InvitationPopover from './InvitationPopover'
import EventCalendar from './EventCalendar';
import axios from 'axios';

function MainViewEvents()
{
    const [loading, setLoading] = useState(true);
    const [availability, setAvailability] = useState([[]]);
    const eventData = useSelector(state => state.eventData);
    var dayOfWeekObj = eventData.daysOfWeek;
    var timeArr = [];

    useEffect(() => {
        setAvailability(calculateAvailability());
        while(!availability)
        {

        }
        setLoading(false);
    }, [])

    function prepData() {
        var newWeekObj = dayOfWeekObj;
        if (newWeekObj != null){
            for ( var i = 0 ; i < newWeekObj.length ; i++ ){
                if (newWeekObj[i] != "")
                    newWeekObj[i] = true;
                else
                    newWeekObj[i] = false;
            }
        }
        console.log(newWeekObj);
        return(newWeekObj);
    }

    function prepTime() {
        var adjustedTime = timeArr;
        var start = parseInt(eventData.startTime);
        var end = parseInt(eventData.endTime);

        for ( var i = start ; i <= end ; i++ ){
            adjustedTime.push(i);
        }
        console.log(adjustedTime);
        return adjustedTime;
    }

    function calculateAvailability() {
        const rows = 7;
        const cols = 48;
        var availabilityTable = Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => 0)
        );
        
        for(let i = 0; i < eventData.participants.length; i++)
        {
            for(let row = 0; row < rows; row++)
            {
                for(let col = 0; col < cols; col++)
                {
                    if(eventData.participants[i].availability[row][col])
                    {
                        availabilityTable[row][col]++;
                    }
                }
            }
        }
        return availabilityTable;
    }
    
    return(
        <div>
        { 
            !loading &&
            <div class="main">
                <span>{eventData.eventName}</span>
                <InvitationPopover />
                <EventCalendar 
                    daysAvailable={prepData()}
                    time={prepTime()}
                    calendar={calculateAvailability()}
                    numParticipants={eventData.participants.length}
                /> 
            </div>
        
        }
        </div>
    );
}
export default MainViewEvents;