import React, {useState} from 'react'
import Modal from 'react-modal';
import EventWeek from './EventWeek';
import EventTime from './EventTime';

function CreateEvent()
{

    const[modalIsOpen, setModalIsOpen] = useState(false);

    return(
        <div>
            <button onClick={()=>setModalIsOpen(true)}>Create Event</button>
            <Modal id="ModalStyle"isOpen={modalIsOpen} 
                style={{
                    overlay:{ 
                        backgroundColor: 'grey'},
                    content: {
                        top: '100px',
                        left: '100px',
                        right: '100px',
                        bottom: '120px',
                        position: 'absolute',
                        borderRadius: '20px'
                          } }}>
               
                <h2>Create New Event</h2>

                <div>
                <div>Select days for the event</div><br/>
                <EventWeek />

                <span>Start Time</span>
                <EventTime /><br/>

                <span>End Time</span>
                <EventTime /><br/>
                
                <button onClick={()=>setModalIsOpen(false)}>Cancel</button>
                <button>Continue</button>
                
                </div>

            </Modal>

        </div>
     
    );
}
export default CreateEvent;