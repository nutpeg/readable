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

const styles = theme => ({
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // width: '100%',
  },
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
    marginLeft: 0,
    minWidth: 120,
  },
});

class PostsNew extends Component {
  state = {
    title: '',
    author: '',
    body: '',
    category: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes, categories } = this.props;
    return (
      <div className="content">
        <Typography variant="display1" gutterBottom>
          New Post
        </Typography>
        <form className={classes.container} noValidate autoComplete="off">
          <p>
            <TextField
              id="author"
              label="Author"
              className={classes.textField}
              margin="normal"
            />
          </p>
          <p>
            <TextField
              id="title"
              label="Title"
              className={classNames(classes.textField, classes.textFieldWide)}
              margin="normal"
            />
          </p>
          <p>
            <TextField
              id="postBody"
              label="Post Content"
              multiline
              rows="10"
              className={classNames(classes.textField, classes.textFieldWide)}
              margin="normal"
            />
          </p>
          <p>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                value={this.state.category}
                onChange={this.handleChange('category')}
                inputProps={{
                  name: 'category',
                  id: 'category',
                }}
              >
                {categories.map(category => (
                  <MenuItem key={category.name} value={category.name}>
                    {capitalize(category.name)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </p>
          <div>
            <Button variant="outlined" className={classes.button}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
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
