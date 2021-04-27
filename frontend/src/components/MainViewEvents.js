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
    useEffect(() => {
        setAvailability(calculateAvailability());
        while(!availability)
        {

        }
        setLoading(false);
    }, [])
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
    var timeArr = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    return(
        <div>
        { 
            !loading &&
            <div class="main">
                <span>{eventData.eventName}</span>
                <InvitationPopover />
                <EventCalendar 
                    daysAvailable={eventData.daysOfWeek}
                    time={timeArr}
                    calendar={calculateAvailability()}
                    numParticipants={eventData.participants.length}
                /> 
            </div>
        
        }
        </div>
    );
}
export default MainViewEvents;