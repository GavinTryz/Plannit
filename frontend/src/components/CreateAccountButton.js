import React from 'react';
import {Link } from 'react-router-dom';

function CreateAccountButton(){

    return <Link to ='/createaccount'><button className="createAccountButton">Create free account</button></Link>;
}
export default CreateAccountButton;