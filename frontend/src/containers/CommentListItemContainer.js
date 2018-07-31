import { connect } from 'react-redux';
import {
  commentVote,
  deleteComment,
  // editCommentStarted,
  // createComment,
 } from '../actions/comments';
import CommentsListItem from '../components/CommentsListItem';

const mapDispatchToProps = dispatch => ({
  onUpVote(id) {
    dispatch(commentVote(id, 'upVote'));
  },
  onDownVote(id) {
    dispatch(commentVote(id, 'downVote'));
  },
  onDeleteItem(id) {
    dispatch(deleteComment(id));
  },
  // onEditItem() {
  //   dispatch(editCommentStarted());
  // },
});

const mapStateToProps = (state) => ({
  isEditing: state.comments.isEditing,
})

const CommentsListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsListItem);

export default CommentsListItemContainer;
