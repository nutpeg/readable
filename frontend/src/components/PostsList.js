import React from 'react';
import ListItemContainer from '../containers/ListItemContainer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SortControlContainer from '../containers/SortControlContainer';
import FlashMessageContainer from '../containers/FlashMessageContainer';
import ModalContainer from '../containers/ModalContainer';
import NewPost from './NewPost';

class PostsList extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { posts, error, category, categories, onCreatePost } = this.props;
    return (
      <div className="content">
        <div className="list__header">
          <Typography variant="display1" gutterBottom>
            { category ? `Posts :: ${category} ` : 'All Posts' }
          </Typography>
          <div className="list__header-button">
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleOpen}
            >
              New Post
            </Button>
          </div>
        </div>
        <ModalContainer onClose={this.handleClose} open={this.state.open}>
          <NewPost
            categories={categories}
            onClose={this.handleClose}
            onCreatePost={onCreatePost}
          />
        </ModalContainer>

        <SortControlContainer />

        {error && <FlashMessageContainer message={error} variant={'error'} />}
        <ul>
          {posts.map(post => (
            <li className="post-item" key={post.id}>
              <ListItemContainer
                item={post}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PostsList;
