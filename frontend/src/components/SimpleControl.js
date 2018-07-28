import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

class SimpleControl extends Component {

  render() {
    const {
      id,
      controlText,
      children,
      handleClick,
    } = this.props;
    return (
      <React.Fragment>
        <Tooltip title={controlText} placement="top">
          <IconButton
            aria-label={controlText}
            onClick={() => handleClick(id)}
          >
            {children}
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default SimpleControl;
