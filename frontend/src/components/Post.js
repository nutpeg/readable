import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchPost, vote, deletePost, editPost } from '../actions/posts';
import PostDetails from './PostDetails';
import FlashMessageContainer from '../containers/FlashMessageContainer';
import { getCapitalizedCategories } from '../reducers/categories';

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
      error,
      categories,
    } = this.props;
    const {
      title,
      author,
      timestamp,
      commentCount,
      body,
      id,
      voteScore,
      category,
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
                body={body}
                category={category}
                onUpVote={onUpVote}
                onDownVote={onDownVote}
                onDeleteItem={onDeleteItem}
                onEditItem={onEditItem}
                categories={categories}
              />
              <div className="post comments-title">
                <Typography variant="title">{`${commentCount} Comments`}</Typography>
              </div>
              <div className="post list comments-list">Comments go here</div>
            </div>
          )}
        {isLoadingPost && !id && <CircularProgress />}
        {error && <FlashMessageContainer message={error} variant={'error'} />}
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
  onEditItem(id, post) {
    dispatch(editPost(id, post));
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    isLoadingPost: state.posts.isLoading,
    isEditing: state.posts.isEditing,
    error: state.posts.error,
    post:
      state.posts.posts.filter(
        post => post.id === ownProps.match.params.id,
      )[0] || {},
    categories: getCapitalizedCategories(state.categories.categories),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
