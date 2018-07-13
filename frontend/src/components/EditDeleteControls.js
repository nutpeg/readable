import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const EditDeleteControls = props => {
  const { item, onEditItem, onDeleteItem } = props;
  return (
    <React.Fragment>
      <IconButton aria-label="Edit" onClick={() => onEditItem(item.id)}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="Delete" onClick={() => onDeleteItem(item.id)}>
        <DeleteIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default EditDeleteControls;
