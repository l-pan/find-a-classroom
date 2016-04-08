import React, { Component } from 'react';

import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';

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
      <div>
        <AppBar
          title="Find a Classroom"
          iconElementLeft={<IconButton><HomeIcon /></IconButton>}
          // onLeftIconButtonTouchTap={this.handleToggle}
          // iconElementRight={<IconButton iconClassName="muidocs-icon-custom-github" />}
        />
        <LeftNav
          docked={false}
          open={this.state.open}
          onRequestChange={this.handleToggle}
        >
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </LeftNav>
      </div>
    );
  }
}

export default NavBar;
