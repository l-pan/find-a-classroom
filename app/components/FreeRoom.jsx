import React, { PropTypes } from 'react';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

function FreeRoom(props) {
  return (
    <TableRow>
      {(() => {
        if (!props.search) {
          return <TableRowColumn>{props.num}</TableRowColumn>;
        }
      })()}
      <TableRowColumn>{props.room.name}</TableRowColumn>
      <TableRowColumn>{`${props.room.remainedTime} minutes left`}</TableRowColumn>
    </TableRow>
  );
}

FreeRoom.propTypes = {
  num: PropTypes.number.isRequired,
  search: PropTypes.bool,
  room: PropTypes.shape({
    endTime: PropTypes.number.isRequired,
    remainedTime: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    time: PropTypes.shape({
      M: PropTypes.array,
      T: PropTypes.array,
      W: PropTypes.array,
      H: PropTypes.array,
      F: PropTypes.array,
    }).isRequired,
  }).isRequired,
};

export default FreeRoom;
