import React, { Component } from 'react';
import VotingControls from './VotingControls';
import SimpleControl from './SimpleControl';
import ItemInfo from './ItemInfo';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditComment from './EditComment';
import ModalContainer from '../containers/ModalContainer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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
      // onOpenCommentModal,
    } = this.props;
    return (
      <div className="list">
        <ModalContainer
          onClose={() => onCloseCommentModal()}
          open={item.id === this.state.selectedId && isEditing}
        >
          {console.log('item.id ', item.id)}
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
            // handleClick={onOpenCommentModal}
            handleClick={id => this.onEditClickHandler(item.id)}
          >
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
        <Divider />
      </div>
    );
  }
}

export default ListItem;
