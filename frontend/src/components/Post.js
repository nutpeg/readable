import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  fetchPost,
  vote,
  deletePost,
  editPost,
  editPostStarted,
  cancelEdit,
} from '../actions/posts';
import { fetchComments } from '../actions/comments';
import PostDetails from './PostDetails';
import CommentListItemContainer from '../containers/CommentListItemContainer';
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
      onOpenModal,
      onCloseModal,
      isLoadingPost,
      isLoadingComments,
      postError,
      commentsError,
      categories,
      isEditing,
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
    const { comments } = this.props;

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
                isEditing={isEditing}
                onOpenModal={onOpenModal}
                onCloseModal={onCloseModal}
              />
              <div className="post comments-title">
                <Typography variant="title">{`${commentCount} Comments`}</Typography>
              </div>
              <div className="comments-list">
                {!isLoadingComments && (
                  <ul>
                    {console.log('comments', comments)}
                    {comments.map(comment => (
                      <li className="post-item" key={comment.id}>
                        <CommentListItemContainer item={comment} />
                        {comment.body}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        {isLoadingPost && !id && <CircularProgress />}
        {postError && (
          <FlashMessageContainer message={postError} variant={'error'} />
        )}
        {commentsError && (
          <FlashMessageContainer message={commentsError} variant={'error'} />
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
    dispatch(fetchComments(id));
  },
  onEditItem(id, post) {
    dispatch(editPost(id, post));
  },
  onDeleteItem(id) {
    dispatch(deletePost(id));
  },
  onOpenModal() {
    dispatch(editPostStarted());
  },
  onCloseModal() {
    dispatch(cancelEdit());
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    isLoadingPost: state.posts.isLoading,
    isLoadingComments: state.comments.isLoading,
    isEditing: state.posts.isEditing,
    postError: state.posts.error,
    commentsError: state.comments.error,
    post:
      state.posts.posts.filter(
        post => post.id === ownProps.match.params.id,
      )[0] || {},
    categories: getCapitalizedCategories(state.categories.categories),
    comments: state.comments.comments,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
