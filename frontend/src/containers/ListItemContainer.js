import { connect } from 'react-redux';
import {
  vote,
  deletePost,
  editPostStarted,
  // editPost,
 } from '../actions/posts';
import ListItem from '../components/ListItem';

const mapDispatchToProps = dispatch => ({
  onUpVote(id) {
    dispatch(vote(id, 'upVote'));
  },
  onDownVote(id) {
    dispatch(vote(id, 'downVote'));
  },
  onDeleteItem(id) {
    dispatch(deletePost(id));
  },
  onEditItem() {
    dispatch(editPostStarted());
  },
});

const mapStateToProps = (state) => ({
  isEditing: state.posts.isEditing,
})

const ListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);

export default ListItemContainer;
