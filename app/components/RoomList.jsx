import React, { PropTypes } from 'react';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';

import FreeRoom from './FreeRoom';

const RoomList = (props) => (
  <div className="row center-xs" style={{ marginTop: '2em' }}>
    {(() => {
      if (props.freeRooms.length === 0) {
        return (
          <div className="col-xs-10" style={{ marginTop: '4em' }}>
            <h1>No Classroom is available</h1>
          </div>
        );
      }
      return null;
    })()}
    <div className="col-md-10 col-xs-12">
      <Table>
        <TableBody
          displayRowCheckbox={false}
          showRowHover
        >
          {props.freeRooms.map((room, i) => <FreeRoom key={i} num={i + 1} room={room} />)}
        </TableBody>
      </Table>
    </div>
  </div>
);

RoomList.propTypes = {
  freeRooms: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    time: PropTypes.shape({
      M: PropTypes.array,
      T: PropTypes.array,
      W: PropTypes.array,
      H: PropTypes.array,
      F: PropTypes.array,
    }).isRequired,
  })).isRequired,
};

export default RoomList;
