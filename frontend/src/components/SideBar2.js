import React from 'react';
import '../flex.scss';
import '../App.scss';

import SideContent from './SideContent';

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leftOpen: false,
    }
  }

  toggleSidebar = (event) => {
    let key = `${event.currentTarget.parentNode.id}Open`;
    this.setState({ [key]: !this.state[key] });
  }


  render() {
    let leftOpen = this.state.leftOpen ? 'open' : 'closed';

    return (
      <div id='layout'>

          <div id='left' className={leftOpen} >
              <div className='icon' onClick={this.toggleSidebar} >  {/*menu button*/}
                   &equiv;
              </div>

              <div className={`sidebar ${leftOpen}`} >  {/*SideBar*/}
                  <div className='header'></div>

                  <div className='content'>     {/*SideBar Content*/}
                      <h3> &nbsp; -SideBar content (buggy atm)-</h3>
                      <SideContent />
                  </div>
                  
              </div>
          </div>

          <div id='main'>
              <div className='header'>  {/*Top Nav*/}
                  <h3 className={`title ${'left-' + leftOpen} `}>
                      Main header (temp)
                  </h3>
              </div>

              <div className='content'>   {/*Main Content*/}
                  <p> Random Text :D </p>
              </div>
          </div>
      </div>
    );
  }
}

export default Layout;