import { connect } from 'react-redux';
import {
  vote,
  // deleteComment,
  // editCommentStarted,
  // createComment,
 } from '../actions/comments';
import CommentsListItem from '../components/CommentsListItem';

const mapDispatchToProps = dispatch => ({
  onUpVote(id) {
    dispatch(vote(id, 'upVote'));
  },
  onDownVote(id) {
    dispatch(vote(id, 'downVote'));
  },
  // onDeleteItem(id) {
  //   dispatch(deleteComment(id));
  // },
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
