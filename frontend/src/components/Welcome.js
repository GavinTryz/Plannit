import React from "react";
import './welcome.css'

function Welcome(){

    const storage = require('../tokenStorage');
    const bp = require('./bp');
    const jwt = require('jsonwebtoken');
    var tok = storage.retrieveToken();
    var ud = jwt.decode(tok, {complete: true});

    var displayUserName = jwt.decode(tok).firstName;

    
    return (
        <div className="welcome">
            <span>Hi {displayUserName},</span><br/>
            <span>Welcome to</span><br/>
            <span id="welcomePlannit">Plannit!</span>
        </div>
        );
}
export default Welcome;