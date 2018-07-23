import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import capitalize from '../utils/capitalize';
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

class PostsNew extends Component {
  state = {
    title: '',
    author: '',
    body: '',
    category: '',
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
      title: '',
      author: '',
      body: '',
      category: '',
    });
  };

  validateForm = () => {
    if (
      !this.state.author.trim() ||
      !this.state.title.trim() ||
      !this.state.body.trim() ||
      !this.state.category.trim()
    ) {
      this.setState({ valid: false });
      return false;
    }
    return true;
  };

  handleCreatePost = e => {
    e.preventDefault();
    if (this.validateForm()) {
      this.props.onCreatePost({
        title: this.state.title,
        author: this.state.author,
        body: this.state.body,
        category: this.state.category,
      });
    }
  };

  render() {
    const { classes, categories, onClose } = this.props;
    const invalidFormMessage = 'All fields should be completed.';
    return (
      <div>
        {!this.state.valid && (
          <FlashMessageContainer
            message={invalidFormMessage}
            variant={'warning'}
          />
        )}
        <Typography variant="display1" gutterBottom>
          New Post
        </Typography>
        <form noValidate autoComplete="off" onSubmit={this.handleCreatePost}>
          <TextField
            id="author"
            label="Author"
            className={classes.textField}
            margin="normal"
            value={this.state.author}
            onChange={this.handleChange('author')}
          />

          <TextField
            id="title"
            label="Title"
            className={classNames(classes.textField, classes.textFieldWide)}
            margin="normal"
            value={this.state.title}
            onChange={this.handleChange('title')}
          />

          <TextField
            id="body"
            label="Post Content"
            multiline
            rows="10"
            className={classNames(classes.textField, classes.textFieldWide)}
            margin="normal"
            value={this.state.body}
            onChange={this.handleChange('body')}
          />

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              value={this.state.category}
              onChange={this.handleChange('category')}
              inputProps={{ name: 'category', id: 'category' }}
            >
              {categories.map(category => (
                <MenuItem key={category.name} value={category.name}>
                  {capitalize(category.name)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
              Create
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(PostsNew);
