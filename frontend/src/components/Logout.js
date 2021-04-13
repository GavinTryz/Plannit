import React from 'react';

function Logout()
{
    const doLogout = () =>
    {
        localStorage.clear();
        window.location.href = '/';
    }
    return <button onClick={doLogout}>Log Out</button>;
}
export default Logout