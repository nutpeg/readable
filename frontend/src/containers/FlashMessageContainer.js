import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import FlashMessage from '../components/FlashMessage';

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class FlashMessageContainer extends React.Component {
  state = {
    open: true,
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes, message } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <FlashMessage
            onClose={this.handleClose}
            variant="error"
            className={classes.margin}
            message={`FlashMessage: ${message}`}
          />
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(styles2)(FlashMessageContainer);
