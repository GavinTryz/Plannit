import React from 'react';
import {useSelector} from 'react-redux';
import './calendar.css';

function ParticipantList(){
    const eventSlot = useSelector(state => state.eventSlot);
    const eventTable = useSelector(state => state.eventTable);
    const hover = useSelector(state => state.slotState);

    function getNames(){
        if (hover){
            if (eventSlot != null && eventTable != null){
                var list = eventTable[eventSlot.row][eventSlot.col];
                //console.log(list);
                if (list != undefined)
                    var newList = newLineText(list);
                return newList
            } else
                return ""
        }
    }

    function newLineText(list) {
        const text = list;
        const newText = text.split(",").map(str => <div class="participantList">{str}</div>);
        return newText;
    }

    return(
        <div> 
            {getNames()}
        </div>
    );
}
export default ParticipantList;