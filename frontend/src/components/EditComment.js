import React, { Component } from 'react';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FlashMessageContainer from '../containers/FlashMessageContainer';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  textFieldWide: {
    width: '100%',
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  buttonBar: {
    marginTop: '1em',
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

class EditComment extends Component {
  state = {
    author: this.props.author || '',
    body: this.props.body || '',
    valid: true,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      valid: true,
    });
  };

  resetForm = () => {
    this.setState({
      author: '',
      body: '',
      valid: true,
    });
  };

  validateForm = () => {
    if (!this.state.author.trim() || !this.state.body.trim()) {
      this.setState({ valid: false });
      return false;
    }
    return true;
  };

  handleEditComment = event => {
    event.preventDefault();
    const timestamp = Date.now();
    if (this.validateForm()) {
      this.props.onEditComment(this.props.id, {
        author: this.state.author,
        body: this.state.body,
        timestamp: timestamp,
      });
      this.props.onClose();
    }
  };

  render() {
    const { classes, onClose } = this.props;
    const invalidFormMessage = 'All fields should be completed.';
    return (
      <div>
        {!this.state.valid && (
          <FlashMessageContainer
            message={invalidFormMessage}
            variant={'warning'}
          />
        )}
        <Typography variant="title" gutterBottom>
          Edit Comment
        </Typography>
        <form noValidate autoComplete="off" onSubmit={this.handleEditComment}>
          <TextField
            id="author"
            label="Your name"
            className={classes.textField}
            margin="normal"
            value={this.state.author}
            onChange={this.handleChange('author')}
          />

          <TextField
            id="body"
            label="What would you like to say?"
            multiline
            rows="5"
            className={classNames(classes.textField, classes.textFieldWide)}
            margin="normal"
            value={this.state.body}
            onChange={this.handleChange('body')}
          />

          <div className={classes.buttonBar}>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={this.resetForm}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(EditComment);
