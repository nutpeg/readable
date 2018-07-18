import React from 'react';
import Typography from '@material-ui/core/Typography';
import VotingControls from './VotingControls';
import EditDeleteControls from './EditDeleteControls';
import ItemInfo from './ItemInfo';

const ListItem = props => {
  const { item, onUpVote, onDownVote, onDeleteItem, onEditItem } = props;
  return (
    <div className="list">
      <div className="list__controls-left">
        <VotingControls
          id={item.id}
          voteScore={item.voteScore}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      </div>
      <div className="list__item">
        <Typography variant="subheading" gutterBottom>
          {item.title}
        </Typography>
        <p>
          <ItemInfo
            author={item.author}
            commentCount={item.commentCount}
            timestamp={item.timestamp}
          />
        </p>
      </div>
      <div className="list__controls-right">
        <EditDeleteControls
          id={item.id}
          onDeleteItem={onDeleteItem}
          onEditItem={onEditItem}
        />
      </div>
    </div>
  );
};

export default ListItem;
