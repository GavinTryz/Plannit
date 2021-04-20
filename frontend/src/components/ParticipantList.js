import React from 'react';
import {useSelector} from 'react-redux';
import './calendar.css';

function ParticipantList(){

    const participantList = useSelector(state => state.participantList);
    function getNames(){
        if (participantList != undefined || participantList !=null) {
            var newList = newLineText(participantList);
            return newList
        } else
            return ""
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