import React from 'react';

function linkChange(){
    window.location.href = '/dashboard/viewEvent'
}

function ViewEventButton(){
    return <button onClick={linkChange}>View Event Example</button>
}
export default ViewEventButton;