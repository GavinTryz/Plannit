import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import './invitationStyle.css'

import {useSelector, useDispatch} from 'react-redux';
import {storeJWT} from '../actions';

const useStyles = makeStyles((theme) => ({
  paper: {
    border: '1px solid',
    borderColor: 'rgb(240, 240, 240)',
    borderRadius: '5px',
    padding: theme.spacing(1),
    backgroundColor:  'rgb(246, 246, 246)',
  },
}));

function AddPersonForm(props) {
    var participantEmail;
    const bp = require('./bp');
    const [ person, setPerson ] = useState('');
    const dispatch = useDispatch();

    const userJWT = useSelector(state => state.userJWT); 
    const eventData = useSelector(state => state.eventData); 
      
    function handleChange(e) {
      setPerson(e.target.value);
    }

    function handleSubmit() {
      props.handleSubmit(person);
      setPerson('');
    }

    const addParticipant = async event => {

      event.preventDefault();
      handleSubmit();

      var obj = {
        jwtToken: userJWT,
        email: participantEmail.value,
        eventID: eventData.eventId,
        eventName: eventData.eventName
      };
      var js = JSON.stringify(obj);

      try
      {    
          const response = await fetch(bp.buildPath('api/inviteUser'),
              {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

          var res = JSON.parse(await response.text());

          dispatch(storeJWT(res.jwtToken));
      }
      catch(e)
      {
          alert(e.toString());
          return;
      }   
    };



    return (
      <form onSubmit={addParticipant}>
        <input type="email" 
          placeholder="Participant's email" 
          onChange={handleChange} 
          ref={(c) => participantEmail = c}
          value={person} />
        <button type="submit">Invite Participant</button>
      </form>
    );
}
  
function PeopleList(props) {
    const arr = props.data;
    const listItems = arr.map((val, index) =>
        <li key={index}>{val}</li>
    );
    return <ul>{listItems}</ul>;
}



function InvitationPopover(props) {

    const [contacts, setContacts] = useState([]);

    function addPerson(name) {
        setContacts([...contacts, name]);
      }
    
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div>
        <button aria-describedby={id} type="button" id="InvitationButtonStyle" onClick={handleClick}>
            <img src="/addparticipant.png" width="30px" height="30px"></img>
        </button>
        <Popper id={id} open={open} anchorEl={anchorEl} >

            <div className={classes.paper}>
                <div>Invite a participant</div><br/>
                <AddPersonForm handleSubmit={addPerson} /> 
                <PeopleList data={contacts} />
            </div>
        </Popper>
        </div>
    );
}

export default InvitationPopover;