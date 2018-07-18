import React from 'react';
import Typography from '@material-ui/core/Typography';
// import VotingControls from './VotingControls';
import VotingControlsContainer from '../containers/VotingControlsContainer';
import EditDeleteControls from './EditDeleteControls';
import ItemInfo from './ItemInfo';

const ListItem = props => {
  const {
    post,
    onUpVote,
    onDownVote,
    onDeletePost,
    onEditPost,
  } = props;
  return (
    <div className="list">
      <div className="list__controls-left">
        <VotingControlsContainer
          // post={post}
          id={post.id}
          voteScore={post.voteScore}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      </div>
      <div className="list__item">
        <Typography variant="subheading" gutterBottom>
          {post.title}
        </Typography>
        <p>
          <ItemInfo item={post} />
        </p>
      </div>
      <div className="list__controls-right">
        <EditDeleteControls
          item={post}
          onDeleteItem={onDeletePost}
          onEditItem={onEditPost}
        />
      </div>
    </div>
  );
};

export default ListItem;
