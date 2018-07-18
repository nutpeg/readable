import React from 'react';
import SortOrderControl from './SortOrderControl';
import ListItemContainer from "../containers/ListItemContainer";
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class PostsList extends React.Component {
  handleChange = event => {
    this.props.onSortOrderChange(event.target.value);
  };

  render() {
    const { posts, sortOrder } = this.props;
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

        <SortOrderControl
          sortOrder={sortOrder}
          onChange={this.handleChange}
          inputProps={{ name: 'sortOrder', id: 'sortOrder' }}
        />

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
