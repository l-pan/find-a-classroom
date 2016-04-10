import React, { Component } from 'react';

import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

import HomeIcon from 'material-ui/lib/svg-icons/action/room';

class NavBar extends Component {

  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
    this.state = { open: false };
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <AppBar
        title="Find a Classroom"
        iconElementLeft={<IconButton><HomeIcon /></IconButton>}
        iconElementRight={
          <IconMenu
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <a href="https://github.com/lorix-lpan/find-a-classroom" style={{ textDecoration: 'none' }}>
              <MenuItem primaryText="View Source" />
            </a>
            <a href="https://github.com/lorix-lpan/find-a-classroom/issues" style={{ textDecoration: 'none' }}>
              <MenuItem primaryText="Report an Issue" />
            </a>
          </IconMenu>
        }
      />
    );
  }
}

export default NavBar;
