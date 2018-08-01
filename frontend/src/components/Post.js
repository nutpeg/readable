import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
import { fetchComments, createComment } from '../actions/comments';
import { getSortedComments } from '../reducers/comments';
import { getPost } from '../reducers/posts';
import PostDetails from './PostDetails';
import FlashMessageContainer from '../containers/FlashMessageContainer';
import { getCapitalizedCategories } from '../reducers/categories';
import NewComment from './NewComment';
import CommentsList from './CommentsList';
import Button from '@material-ui/core/Button';

class Post extends Component {
  state = {
    show: false,
  };

  toggleOpen = () => {
    const currentState = this.state.show;
    this.setState({ show: !currentState });
  };

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
      onCreateComment,
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

    return <div className="content">
        {Object.keys(this.props.post).length === 0 && <Redirect to="/pageNotFound" />}
        {!isLoadingPost && id && <div>
              <PostDetails id={id} title={title} author={author} timestamp={timestamp} commentCount={commentCount} voteScore={voteScore} body={body} category={category} onUpVote={onUpVote} onDownVote={onDownVote} onDeleteItem={onDeleteItem} onEditItem={onEditItem} categories={categories} isEditing={isEditing} onOpenModal={onOpenModal} onCloseModal={onCloseModal} />

              <div className="comments list__header">
                <Typography variant="display1" gutterBottom>
                  Comments
                </Typography>

                <div className="list__header-button">
                  <Button variant="contained" color="secondary" onClick={this.toggleOpen}>
                    Add Comment
                  </Button>
                </div>
              </div>
              <div className="comment-count">
                <Typography variant="body1" gutterBottom>
                  {commentCount}
                  {commentCount === 1 ? ' comment' : ' comments'}
                </Typography>
              </div>
              <div className={'post comments-form ' + (this.state.show ? 'show' : '')}>
                <NewComment onCreateComment={onCreateComment} parentId={id} className={this.state.show ? 'show' : ''} onClose={this.toggleOpen} />
              </div>

              <CommentsList isLoadingComments={isLoadingComments} comments={comments} />
            </div>}
        {isLoadingPost && !id && <CircularProgress />}
        {isLoadingComments && !id && <CircularProgress />}
        {postError && <FlashMessageContainer message={postError} variant={'error'} />}
        {commentsError && <FlashMessageContainer message={commentsError} variant={'error'} />}
      </div>;
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
  onCreateComment(comment) {
    dispatch(createComment(comment));
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    isLoadingPost: state.posts.isLoading,
    isLoadingComments: state.comments.isLoading,
    isEditing: state.posts.isEditing,
    postError: state.posts.error,
    commentsError: state.comments.error,
    post: getPost(state.posts.posts, ownProps.match.params.id),
    categories: getCapitalizedCategories(state.categories.categories),
    comments: getSortedComments(state.comments.comments),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
