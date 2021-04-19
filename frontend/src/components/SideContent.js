import React, { useState } from 'react';
import Tabs from './Tabs';
import '../App.scss';

function SideContent() {
  const [toggled, setToggled] = useState(false);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <div >
      <Tabs
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
      />
    </div>
  );
}

export default SideContent;