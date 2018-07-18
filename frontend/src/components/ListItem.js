import React from 'react';
import Typography from '@material-ui/core/Typography';
import VotingControlsContainer from '../containers/VotingControlsContainer';
import EditDeleteControls from './EditDeleteControls';
import ItemInfo from './ItemInfo';

const ListItem = props => {
  const { post, onUpVote, onDownVote, onDeletePost, onEditPost } = props;
  return (
    <div className="list">
      <div className="list__controls-left">
        <VotingControlsContainer
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
          <ItemInfo
            author={post.author}
            commentCount={post.commentCount}
            timestamp={post.timestamp}
          />
        </p>
      </div>
      <div className="list__controls-right">
        <EditDeleteControls
          id={post.id}
          onDeleteItem={onDeletePost}
          onEditItem={onEditPost}
        />
      </div>
    </div>
  );
};

export default ListItem;
