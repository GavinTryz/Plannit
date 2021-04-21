import React, {useState} from 'react'
import Modal from 'react-modal';
import EventWeek from './EventWeek';
import EventTime from './EventTime';
import EventName from './EventName';
import './modalContent.css';
import EventWeekly from './EventWeekly';

function CreateEvent()
{
    // Set modal show / hide
    const[modalIsOpen, setModalIsOpen] = useState(false);

    // Set Error message
    const [message,setMessage] = useState('');

    const[eventName, setEventName] = useState('Untitled Event');
    const[startTime, setStartTime] = useState('0');
    const[endTime, setEndTime] = useState('0');
    const[weeklyEvent, setWeeklyEvent] = useState(false);

    // Set default state for each day of the week 
    const[sunday, setSunday] = useState('')
    const[monday, setMonday] = useState('')
    const[tuesday, setTuesday] = useState('')
    const[wednesday, setWednesday] = useState('')
    const[thursday, setThursday] = useState('')
    const[friday, setFriday] = useState('')
    const[saturday, setSaturday] = useState('')
   

    function handlechange(e){
        setEventName(e.target.value);
    };

    function handlechangeForStartTime(e){
        setStartTime(e.target.value);
    };

    function handlechangeForEndTime(e){
        setEndTime(e.target.value);
    };

    function handleChangeforWeekly(){
        weeklyEvent == false ? setWeeklyEvent(true) : setWeeklyEvent(false);
    }

    function handleChangeforSunday(){
        sunday == ''? setSunday('Sunday') : setSunday('')    ;    
    }

    function handleChangeforMonday(){
        monday == ''? setMonday("Monday") : setMonday('');
    }

    function handleChangeforTuesday(){
        tuesday == ''? setTuesday('Tuesday') : setTuesday('');
    }

    function handleChangeforWednesday(){
        wednesday == ''? setWednesday('Wednesday') : setWednesday('');
    }
   
    function handleChangeforThursday(){
        thursday == ''? setThursday('Thursday') : setThursday('');
    }

    function handleChangeforFriday(){
        friday == ''? setFriday('Friday') : setFriday('');
    }

    function handleChangeforSaturday(){
        saturday == ''? setSaturday('Saturday') : setSaturday('');
    }

    const bp = require('./bp.js');

    const storage = require('../tokenStorage.js');
    const jwt = require('jsonwebtoken');
    var tok = storage.retrieveToken();
    var ud = jwt.decode(tok, {complete: true});
    //var creatorID = ud.payload.userID;
 
    const handleCreateEvent = async event => 
    {
        event.preventDefault();

        var obj = {
            creatorID: ud.payload.userId,
            eventName:eventName,
            weekly: weeklyEvent,
            startTime:startTime,
            endTime: endTime,
            daysOfWeek: [sunday, monday, tuesday, wednesday, thursday, friday, saturday],
            jwtToken: tok
        };
        var js = JSON.stringify(obj);
      
        try
        {    
            const response = await fetch(bp.buildPath('api/createEvent'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                
            var res = JSON.parse(await response.text());

            if( res.error)
            {
                var jsTest = JSON.stringify(res.error);

                setMessage('Error creating the event');
            }
            else
            {
                setMessage('');
                setModalIsOpen(false);
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    }
    


    }

    return(
        <div>
            <button onClick={()=>setModalIsOpen(true)}>Create Event</button>
            <Modal id="ModalStyle"isOpen={modalIsOpen} 
                style={{
                    overlay:{ backgroundColor: '#00000080'},
                    content:{
                        margin: 'auto',
                        maxHeight: '430px',
                        maxWidth: '700px',
                        top: '100px',
                        left: '160px',
                        right: '160px',
                        bottom: '140px',
                        position: 'absolute',
                        borderRadius: '20px',
                        padding: '20px'
                    }}}>

                {/* Modal content starts here*/}

                <form onSubmit = {handleCreateEvent}>
                    <h2 id='title'>Create New Event</h2>
                        <div className='block1'>
                            <div className='block1Content'>
                                <div id ='headerStyle'>Select days for the event:</div><br/>
                                <EventWeek day = "Sunday" onChange = {()=>handleChangeforSunday("Sunday")}/>
                                <EventWeek day = "Monday" onChange = {()=>handleChangeforMonday("Monday")}/>
                                <EventWeek day = "Tuesday" onChange = {()=>handleChangeforTuesday("Tuesday")}/>
                                <EventWeek day = "Wednesday" onChange = {()=>handleChangeforWednesday("Wednesday")}/>
                                <EventWeek day = "Thursday" onChange = {()=>handleChangeforThursday("Thursday")}/>
                                <EventWeek day = "Friday" onChange = {()=>handleChangeforFriday("Friday")}/>
                                <EventWeek day = "Saturday" onChange = {()=>handleChangeforSaturday("Saturday")}/>
                            </div>
                        </div>
                        <div className='block2'>
                            <EventName
                                label = 'Name of the event:'
                                value = {eventName}
                                onChange = {handlechange}
                            /><br/><br/>

                            <EventTime
                                label = 'Start Time:'
                                onChange = {handlechangeForStartTime}
                            /><br/><br/>

                            <EventTime
                                label = 'End Time:'
                                onChange = {handlechangeForEndTime}
                            /><br/><br/>

                            <EventWeekly
                                onChange = {handleChangeforWeekly}
                            /><br/>
                        </div>
                        <div className='block3'>
                            <button className='modalBtn' onClick={()=>setModalIsOpen(false)}>Cancel</button>
                            <span className='separation'></span>
                            <button className='modalBtn' onClick={handleCreateEvent}>Create</button>
                        </div>
                </form>

            </Modal>
        </div>
    );
}
export default CreateEvent;
