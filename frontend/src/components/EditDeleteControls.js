import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const EditDeleteControls = props => {
  const { id, onEditItem, onDeleteItem } = props;
  return (
    <React.Fragment>
      <IconButton aria-label="Edit" onClick={() => onEditItem(id)}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="Delete" onClick={() => onDeleteItem(id)}>
        <DeleteIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default EditDeleteControls;
