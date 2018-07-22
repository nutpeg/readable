import React from 'react';
import Typography from '@material-ui/core/Typography';
import ItemInfo from './ItemInfo';
import VotingControls from './VotingControls';
import EditDeleteControls from './EditDeleteControls';


const PostDetails = props => {
  const {
    id,
    title,
    author,
    timestamp,
    commentCount,
    body,
    voteScore,
    onUpVote,
    onDownVote,
    onEditItem,
    onDeleteItem,
  } = props;
  return (
    <div className="post">
      <div className="post-title">
        <Typography variant="display1" gutterBottom>
          {title}
        </Typography>
      </div>
      <div className="post-info">
        <Typography variant="body2" gutterBottom>
          <ItemInfo
            author={author}
            timestamp={timestamp}
            commentCount={commentCount}
          />
        </Typography>

        <div className="list__controls-right">
          <EditDeleteControls
            id={id}
            onDeleteItem={onDeleteItem}
            onEditItem={onEditItem}
          />
        </div>
      </div>
      <VotingControls
        id={id}
        voteScore={voteScore}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
      />
      <div className="post-body">
        <Typography variant="body1" gutterBottom>
          {body}
        </Typography>
      </div>
    </div>
  );
};

export default PostDetails;
