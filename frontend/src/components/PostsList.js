import React from 'react';
import Post from './Post';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const PostsList = props => {
  const { posts } = props;
  return <div className="content">
      <Typography variant="display1" gutterBottom>
        Posts
      </Typography>
      <div>
        <Link to="/posts/new">
          <Button variant="contained" color="primary">
            New Post
          </Button>
        </Link>
      </div>
      <ul>
        {posts.map(post => <li className="post-item" key={post.id}>
            <Post post={post} />
          </li>)}
      </ul>
    </div>;
};

export default PostsList;
