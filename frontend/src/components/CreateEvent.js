import React, {useState} from 'react'
import Modal from 'react-modal';
import EventWeek from './EventWeek';
import EventTime from './EventTime';
import EventName from './EventName';
import './modalContent.css';

function CreateEvent()
{

    const[modalIsOpen, setModalIsOpen] = useState(false);

    return(
        <div>
            <button onClick={()=>setModalIsOpen(true)}>Create Event</button>
            <Modal id="ModalStyle"isOpen={modalIsOpen} 
                style={{
                    overlay:{ 
                        backgroundColor: '#00000080'
                    },
                       
                    content: {
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
                          } }}>
               
                <h2 id='title'>Create New Event</h2>

                <div className='block1'>
                    <div className='block1Content'>
                        <div id ='headerStyle'>Select days for the event:</div><br/>
                        <EventWeek />
                    </div>
                </div>
                <div className='block2'>
                    <EventName /><br/><br/>

                    <label>Start Time:</label><br/>
                    <EventTime /><br/><br/>

                    <label>End Time:</label><br/>
                    <EventTime /><br/>
                </div>
                <div className='block3'>
                    <button className='modalBtn' onClick={()=>setModalIsOpen(false)}>Cancel</button>
                    <span className='separation'>
                    </span>
                    <button className='modalBtn'>Create</button>
                </div>
            </Modal>
        </div>
    );
}
export default CreateEvent;