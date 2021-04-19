import React from 'react';
import RetrieveCalendar from './RetrieveCalendar';

function RetrieveEvent(){

    
    var eventObject = ['Plannit', 'Contastics', 'NotFacebook'];



    function showEvent(){
        return(
            <RetrieveCalendar/>
        );
        
    }
    
    var eventsList = (eventObject, i) =>{
     
        return(
            <table class = 'events'>
                <tr key={i}>
                    <td className = 'eventButton'><button onClick={()=>showEvent(eventObject)}>{eventObject}</button></td>
                </tr>
            </table>
        );
    }

    return(
     <div>
        {eventObject.map(eventsList)}
     </div>
           
       
    );
}

export default RetrieveEvent;