import React from 'react';
import PostSummary from './PostSummary';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
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
  button: {
    margin: theme.spacing.unit,
  },
});

class PostsList extends React.Component {

  handleChange = event => {
    this.props.onSortOrderChange(event.target.value);
  };

  render() {
    const {
      classes,
      posts,
      onDownVote,
      onUpVote,
      onDeletePost,
      onEditPost,
      sortOrder,
    } = this.props;
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
            <InputLabel htmlFor="sortOrder">Sort by</InputLabel>
            <Select
              value={sortOrder}
              onChange={this.handleChange}
              inputProps={{ name: 'sortOrder', id: 'sortOrder' }}
            >
              <MenuItem value={'timestamp'}>Most recent</MenuItem>
              <MenuItem value={'voteScore'}>Most votes</MenuItem>
            </Select>
          </FormControl>
        </form>

        <ul>
          {posts.map(post => (
            <li className="post-item" key={post.id}>
              <PostSummary
                post={post}
                onDownVote={onDownVote}
                onUpVote={onUpVote}
                onDeletePost={onDeletePost}
                onEditPost={onEditPost}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withStyles(styles)(PostsList);
