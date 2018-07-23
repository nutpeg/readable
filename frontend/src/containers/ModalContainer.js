import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
  paper: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    margin: 'auto',
    width: 620,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 4,
  },
});

class ModalContainer extends React.Component {
  render() {
    const { classes, open, onClose } = this.props;

    return (
      <div>
        <Modal
          open={open}
          onClose={onClose}
        >
          <div className={classes.paper}>
          {this.props.children}
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(ModalContainer);
