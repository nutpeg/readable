import React from 'react';
import ListItemContainer from "../containers/ListItemContainer";
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SortControlContainer from '../containers/SortControlContainer';
import FlashMessageContainer from '../containers/FlashMessageContainer';

class PostsList extends React.Component {

  render() {
    const { posts, error } = this.props;
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

        <SortControlContainer />

        {error && <FlashMessageContainer message={error} variant={'error'} />}
        <ul>
          {posts.map(post => (
            <li className="post-item" key={post.id}>
              <ListItemContainer item={post} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PostsList;
