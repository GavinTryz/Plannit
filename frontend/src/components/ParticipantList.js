import React from 'react';
import {useSelector} from 'react-redux';

function ParticipantList(){


    const eventSlot = useSelector(state => state.eventSlot);
    const eventTable = useSelector(state => state.eventTable);

    function getNames(){
        console.log(eventSlot);
        if (eventSlot != null && eventTable != null){
            var list = eventTable[eventSlot.row][eventSlot.col];
            console.log(list);
            return list
        } else
            return ""
        
    }

    return(
        //{getNames}
        <div> 
            {getNames()}
        </div>
    );
}
export default ParticipantList;