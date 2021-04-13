import React from 'react';

function EventName(props){

    return(
        <span>
            <label>{props.label}</label><br/>
            <input 
                type="text" 
                value={props.value}
                onChange={props.onChange}
            />
        </span>
    );
  
}
export default EventName;