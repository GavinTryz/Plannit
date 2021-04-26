import React, { useState } from 'react';
import {Link } from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux';

import EmailForm from './EmailForm';
import TokenForm from './TokenForm';

function ForgotPassword()
{
    const sentEmail = useSelector(state => state.emailState);
    var resetForm;

    if (sentEmail) {
        resetForm = <EmailForm />;
    } else {
        resetForm = <TokenForm />;
    }

    return(
        <div className = 'backgroundLogin'><br />
            <div className= 'loginSection'>
                <span id = 'signInName'>Reset Password</span>
                    {resetForm}
            </div>
        </div>
    );
}

export default ForgotPassword;
