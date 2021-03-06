import React, { Component } from 'react';
import VotingControls from './VotingControls';
import SimpleControl from './SimpleControl';
import ItemInfo from './ItemInfo';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditComment from './EditComment';
import ModalContainer from '../containers/ModalContainer';
import Typography from '@material-ui/core/Typography';

class ListItem extends Component {
  state = {
    selectedId: '',
  };

  onEditClickHandler = id => {
    this.setState({ selectedId: id });
    this.props.onOpenCommentModal();
  };

  render() {
    const {
      item,
      onUpVote,
      onDownVote,
      onDeleteItem,
      onEditItem,
      isEditing,
      onCloseCommentModal,
    } = this.props;
    return (
      <div className="list">
        <ModalContainer
          onClose={() => onCloseCommentModal()}
          open={item.id === this.state.selectedId && isEditing}
        >
          <EditComment
            onClose={() => onCloseCommentModal()}
            onEditComment={onEditItem}
            id={item.id}
            author={item.author}
            body={item.body}
          />
        </ModalContainer>
        <div className="list__controls-left">
          <VotingControls
            id={item.id}
            voteScore={item.voteScore}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
          />
        </div>
        <div className="list__item">
          <p>
            <ItemInfo author={item.author} timestamp={item.timestamp} />
          </p>
          <Typography variant="body1" gutterBottom>
            {item.body}
          </Typography>
        </div>
        <div className="list__controls-right">
          <SimpleControl
            controlText="Edit"
            id={item.id}
            isEditing={isEditing}
            handleClick={id => this.onEditClickHandler(item.id)}
          >
            <EditIcon />
          </SimpleControl>
          <SimpleControl
            controlText="Delete"
            id={item.id}
            handleClick={() => onDeleteItem(item.id, item.parentId)}
          >
            <DeleteIcon />
          </SimpleControl>
        </div>
      </div>
    );
  }
}

export default ListItem;
