import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaRegLaughWink, FaHeart } from 'react-icons/fa';

const Tabs = ({ collapsed, toggled, handleToggleSidebar }) => {
  
  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >

      <SidebarContent>

        <Menu iconShape="circle">
          <MenuItem icon={<FaTachometerAlt />}
            suffix={<span className="badge red">new</span>}
          >
            Dashboard
          </MenuItem>


          <MenuItem icon={<FaGem />}> 
            Components
          </MenuItem>
        </Menu>

        <Menu iconShape="circle">
          <SubMenu
            suffix={<span className="badge yellow">3</span>}
            title={'withSuffix'}
            icon={<FaRegLaughWink />}
          >
            <MenuItem>submenu 1</MenuItem>
            <MenuItem>submenu 2</MenuItem>
            <MenuItem>submenu 3</MenuItem>
          </SubMenu>

          <SubMenu
            prefix={<span className="badge gray">3</span>}
            title={'withPrefix'}
            icon={<FaHeart />}
          >
            <MenuItem>submenu 1</MenuItem>
            <MenuItem>submenu 2</MenuItem>
            <MenuItem>submenu 3</MenuItem>
          </SubMenu>

          <SubMenu title={'multilevel'} icon={<FaList />}>
            <MenuItem>submenu 1 </MenuItem>
            <MenuItem>submenu 2 </MenuItem>

            <SubMenu title={'submenu 3'}>
              <MenuItem>submenu 3.1 </MenuItem>
              <MenuItem>submenu 3.2 </MenuItem>

              <SubMenu title={'submenu 3.3'}>
                <MenuItem>submenu 3.3.1 </MenuItem>
                <MenuItem>submenu 3.3.2 </MenuItem>
                <MenuItem>submenu 3.3.3 </MenuItem>
              </SubMenu>

            </SubMenu>
          </SubMenu>

        </Menu> 
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
        </div>
      </SidebarFooter>

    </ProSidebar>
  );
};

export default Tabs;