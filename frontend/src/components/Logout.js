import React from 'react';
import {useDispatch} from 'react-redux';
import {logOut} from '../actions';

function Logout()
{
    const dispatch = useDispatch();

    const doLogout = () =>
    {
        dispatch(logOut());
        localStorage.clear();
        window.location.href = '/';
    }
    {/*return <button onClick={doLogout}>Log Out</button>;*/}
    return <span onClick={doLogout}>Log Out</span>;
}
export default Logout