import React from 'react';
import PostSummary from './PostSummary';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: 20,
    paddingLeft: 0,
  },
  formControl: {
    margin: theme.spacing.unit,
    marginLeft: 0,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class PostsList extends React.Component {
  state = {
    sortByValue: 'timestamp',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, posts } = this.props;
    return (
      <div className="content">
        <div className="posts-list__header">
          <Typography variant="display1" gutterBottom>
            Posts
          </Typography>
          <div className="posts-list__header-button">
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/posts/new"
            >
              New Post
            </Button>
          </div>
        </div>

        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="sort-by">Sort by</InputLabel>
            <Select
              value={this.state.sortByValue}
              onChange={this.handleChange}
              inputProps={{
                name: 'sortByValue',
                id: 'sort-by',
              }}
            >
              <MenuItem value={'timestamp'}>Most recent</MenuItem>
              <MenuItem value={'votes'}>Most votes</MenuItem>
            </Select>
          </FormControl>
        </form>
        {/* <div>
          <div className={classes.root}>
            <List component="nav">
              <ListItem
                button
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="Sort by"
                onClick={this.handleClickListItem}
              >
                <ListItemText
                  primary="Sort by"
                  secondary={options[this.state.selectedIndex]}
                />
              </ListItem>
            </List>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  disabled={index === 0}
                  selected={index === this.state.selectedIndex}
                  onClick={event => this.handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div> */}

        <ul>
          {posts.map(post => (
            <li className="post-item" key={post.id}>
              <PostSummary post={post} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withStyles(styles)(PostsList);
