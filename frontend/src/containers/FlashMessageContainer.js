import React from 'react';
import { connect } from 'react-redux';
import { cancelError } from '../actions/posts';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import FlashMessage from '../components/FlashMessage';

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  wideBar: {
    maxWidth: '700px'
  }
});

class FlashMessageContainer extends React.Component {
  state = {
    open: true,
  };

  componentWillUnmount() {
    this.props.cancelError();
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes, message, variant } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          className={classes.wideBar}
        >
          <FlashMessage
            onClose={this.handleClose}
            variant={variant}
            className={classes.margin}
            message={message}
          />
        </Snackbar>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  cancelError() {
    dispatch(cancelError());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles2)(FlashMessageContainer));
