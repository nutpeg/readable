import { connect } from 'react-redux';
import {
  commentVote,
  deleteComment,
  editCommentStarted,
  cancelEditComment,
  editComment,
 } from '../actions/comments';
import CommentsListItem from '../components/CommentsListItem';

const mapDispatchToProps = dispatch => ({
  onUpVote(id) {
    dispatch(commentVote(id, 'upVote'));
  },
  onDownVote(id) {
    dispatch(commentVote(id, 'downVote'));
  },
  onDeleteItem(id, parentId) {
    dispatch(deleteComment(id, parentId));
  },
  onEditItem(id, comment) {
    dispatch(editComment(id, comment));
  },
  onOpenCommentModal() {
    dispatch(editCommentStarted());
  },
  onCloseCommentModal() {
    dispatch(cancelEditComment());
  },
});

const mapStateToProps = (state) => ({
  isEditing: state.comments.isEditing,
})

const CommentsListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsListItem);

export default CommentsListItemContainer;
