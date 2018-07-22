import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {
  fetchPost,
  vote,
  deletePost,
  // editPost,
} from '../actions/posts';
import ItemInfo from './ItemInfo';
import EditDeleteControls from './EditDeleteControls';

class Post extends Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }
  render() {
    const {
      title,
      author,
      timestamp,
      commentCount,
      body,
      id,
      onDeleteItem,
      onEditItem,
    } = this.props.post;
    return (
      <div>
        <div className="post post-title">
          <Typography variant="display1" gutterBottom>
            {title}
          </Typography>
        </div>
        <div className="post post-info">
          <Typography variant="body2" gutterBottom>
            <ItemInfo
              author={author}
              timestamp={timestamp}
              commentCount={commentCount}
            />
          </Typography>
          <EditDeleteControls
            id={id}
            onDeleteItem={onDeleteItem}
            onEditItem={onEditItem}
          />
        </div>
        <div className="post post-body">
          <Typography variant="body1" gutterBottom>
            {body}
          </Typography>
        </div>
        <div className="post comments-title">
          <Typography variant="title">{`${commentCount} Comments`}</Typography>
        </div>
        <div className="post list comments-list">Comments go here</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPost(id) {
    dispatch(fetchPost(id));
  },
  onDeleteItem(id) {
    dispatch(deletePost(id));
  },
  // onEditItem(post) {
  //   dispatch(editPost(post));
  // },
});

const mapStateToProps = (state, ownProps) => {
  return {
    isLoadingPost: state.posts.isLoadingPost,
    post:
      state.posts.posts.filter(
        post => post.id === ownProps.match.params.id,
      )[0] || {},
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
