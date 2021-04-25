import React from 'react';
import {useDispatch} from 'react-redux';
import {logOut} from '../actions';

function EMPTY_BUTTON()
{
    const dispatch = useDispatch();

    const clearData = () =>
    {
        dispatch(logOut());
    }
    return <button onClick={clearData}>CLEAR DATA</button>;
}
export default EMPTY_BUTTON