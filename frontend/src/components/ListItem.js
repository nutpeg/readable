import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import VotingControls from './VotingControls';
import SimpleControl from './SimpleControl';

import ItemInfo from './ItemInfo';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
        <Link to={`${item.category}/${item.id}`}>
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
        </Link>
      </div>
      <div className="list__controls-right">
        <SimpleControl controlText="Edit" id={item.id} handleClick={onEditItem}>
          <EditIcon />
        </SimpleControl>
        <SimpleControl
          controlText="Delete"
          id={item.id}
          handleClick={onDeleteItem}
        >
          <DeleteIcon />
        </SimpleControl>
      </div>
    </div>
  );
};

export default ListItem;
