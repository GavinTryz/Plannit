import React from 'react';
import InternalMenuBar from '../components/InternalMenuBar';



const Dashboard = () =>
{
    function handleSearch(){
        alert("searh event");
    };

    return(
        <div className="search-container">
                 <form onSubmit={handleSearch}>
                 <input type="text" placeholder="Search events.." name="search" />
                    <button type="submit">Search</button>
                 </form>
        </div>

    );
};
export default Dashboard;
