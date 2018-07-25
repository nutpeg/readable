import { connect } from 'react-redux';
import {
  vote,
  deletePost,
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
  // onEditPost(post) {
  //   dispatch(editPost(post));
  // },
});

// const mapStateToProps = (state, ownProps) => {

// }

const ListItemContainer = connect(
  null,
  mapDispatchToProps
)(ListItem);

export default ListItemContainer;
