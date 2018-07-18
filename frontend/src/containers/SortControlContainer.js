import { connect } from 'react-redux';
import {
  sortPosts,
} from '../actions/posts';
import SortControl from '../components/SortControl'

const mapDispatchToProps = dispatch => ({
  onSortOrderChange(sortOrder) {
    dispatch(sortPosts(sortOrder));
  },
});

const mapStateToProps = state => ({
  sortOrder: state.posts.sortOrder,
});

const SortControlContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SortControl);

export default SortControlContainer;
