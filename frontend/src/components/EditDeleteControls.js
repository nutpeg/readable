import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const EditDeleteControls = props => {
  const { id, onEditItem, onDeleteItem } = props;
  return (
    <React.Fragment>
      <Tooltip title="Edit" placement="top">
        <IconButton aria-label="Edit" onClick={() => onEditItem(id)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete" placement="top">
        <IconButton aria-label="Delete" onClick={() => onDeleteItem(id)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
};

export default EditDeleteControls;
