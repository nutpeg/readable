import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  fetchPost,
  vote,
  deletePost,
  // editPost,
} from '../actions/posts';
import PostDetails from './PostDetails';

class Post extends Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }
  render() {
    const {
      onUpVote,
      onDownVote,
      onDeleteItem,
      onEditItem,
      isLoadingPost,
    } = this.props;
    const {
      title,
      author,
      timestamp,
      commentCount,
      body,
      id,
      voteScore,
    } = this.props.post;

    return (
      <div className="content">
        {!isLoadingPost &&
          id && (
            <div>
              <PostDetails
                id={id}
                title={title}
                author={author}
                timestamp={timestamp}
                commentCount={commentCount}
                voteScore={voteScore}
                onUpVote={onUpVote}
                onDownVote={onDownVote}
                onDeleteItem={onDeleteItem}
                onEditItem={onEditItem}
                body={body}
              />
              <div className="post comments-title">
                <Typography variant="title">{`${commentCount} Comments`}</Typography>
              </div>
              <div className="post list comments-list">Comments go here</div>
            </div>
          )}
        {isLoadingPost && !id && <CircularProgress />}
        {!isLoadingPost &&
          !id && (
            <Typography variant="headline">
              Sorry, the post you are looking for does not exist.
            </Typography>
          )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onUpVote(id) {
    dispatch(vote(id, 'upVote'));
  },
  onDownVote(id) {
    dispatch(vote(id, 'downVote'));
  },
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
    isLoadingPost: state.posts.isLoading,
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