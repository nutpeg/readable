import { connect } from 'react-redux';
import { vote } from '../actions/posts';
import VotingControls from '../components/VotingControls';

const mapDispatchToProps = dispatch => ({
  onUpVote(id) {
    dispatch(vote(id, 'upVote'));
  },
  onDownVote(id) {
    dispatch(vote(id, 'downVote'));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(VotingControls);
