import React, { Component } from 'react';
import Dialog from 'material-ui/lib/dialog';
import TimePicker from 'material-ui/lib/time-picker/time-picker';
import FlatButton from 'material-ui/lib/flat-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ActionSearch from 'material-ui/lib/svg-icons/action/search';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

import RoomList from '../RoomList';
import getRooms from '../../helpers/getRooms';
import matchDay from '../../helpers/matchDay';

class SearchFreeRooms extends Component {

  constructor(props) {
    super(props);
    this.state = {
      freeRooms: [],
      open: false,
      value: 1,
    };

    this.filterRooms = this.filterRooms.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeTimePicker = this.handleChangeTimePicker.bind(this);
    this.handleSelectField = this.handleSelectField.bind(this);
  }

  componentDidMount() {
    this.serverRequest = getRooms((err, data) => {
      this.allRooms = JSON.parse(data.text);
    });
  }

  componentWillUnmount() {
    if (this.serverRequest) {
      this.serverRequest.abort();
    }
  }

  handleSelectField(event, index, value) {
    this.setState({ value });
  }

  handleChangeTimePicker(err, date) {
    const time = date.getHours() * 60 + date.getMinutes();
    this.setState({
      time,
      date,
    });
  }

  handleOpen() {
    this.setState({
      open: true,
      freeRooms: [],
      searchFailed: false,
    });
  }

  handleClose() {
    this.setState({ open: false });
  }

  filterRooms() {
    const time = this.state.time;
    const day = matchDay(this.state.value)[0];
    const rooms = this.allRooms;
    let freeRooms = [];

    rooms.forEach(room => {
      room.time[day].forEach(timeSlot => {
        if (time >= timeSlot[0] && time <= timeSlot[1]) {
          freeRooms.push(Object.assign({}, room, { endTime: timeSlot[1] }));
        }
      });
    });
    if (freeRooms.length === 0) {
      this.setState({ searchFailed: true });
    } else {
      // sort rooms according to remained time
      freeRooms = freeRooms.
        map(freeRoom => {
          const remainedTime = freeRoom.endTime - this.state.time;
          return Object.assign({}, freeRoom, { remainedTime });
        }).
        sort((a, b) => {
          if (a.remainedTime > b.remainedTime) {
            return -1;
          } else if (a.remainedTime < b.remainedTime) {
            return 1;
          }
          return 0;
        });
    }
    this.setState({ freeRooms });
  }

  render() {
    const actions = [
      <FlatButton
        label="Search"
        primary
        keyboardFocused
        onTouchTap={this.filterRooms}
      />,
      <FlatButton
        label="Cancel"
        secondary
        onTouchTap={this.handleClose}
      />,
    ];

    const styles = {
      button: {
        position: 'absolute',
        top: '13%',
        right: '3%',
      },
    };

    return (
      <div style={styles.button}>
        <FloatingActionButton secondary label="Search" onTouchTap={this.handleOpen}>
          <ActionSearch />
        </FloatingActionButton>
        <Dialog
          title="Search"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <TimePicker
            value={this.state.date}
            format="ampm"
            hintText="Time"
            onChange={this.handleChangeTimePicker}
          />
          <SelectField value={this.state.value} onChange={this.handleSelectField}>
            <MenuItem value={1} primaryText="Monday"/>
            <MenuItem value={2} primaryText="Tuesday"/>
            <MenuItem value={3} primaryText="Wednesday"/>
            <MenuItem value={4} primaryText="Thursday"/>
            <MenuItem value={5} primaryText="Friday"/>
          </SelectField>
          <RoomList
            freeRooms={this.state.freeRooms}
            search
            searchFailed={this.state.searchFailed}
          />
        </Dialog>
      </div>
    );
  }
}

export default SearchFreeRooms;
