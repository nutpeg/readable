import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const SimpleControl = props => {
  const { id, controlText, handleClick, children } = props;
  return (
    <React.Fragment>
      <Tooltip title={controlText} placement="top">
        <IconButton aria-label={controlText} onClick={() => handleClick(id)}>
          {children}
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
};

export default SimpleControl;
