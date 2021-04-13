import React from 'react';

function Logout()
{
    const doLogout = () =>
    {
        localStorage.clear();
        window.location.href = '/';
    }
    {/*return <button onClick={doLogout}>Log Out</button>;*/}
    return <span onClick={doLogout}>Log Out</span>;
}
export default Logout