import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ItemInfo from './ItemInfo';
import VotingControls from './VotingControls';
import EditDeleteControls from './EditDeleteControls';
import ModalContainer from '../containers/ModalContainer';
import EditPost from './EditPost';

const style = {
  fontSize: '1.2em',
};

class PostDetails extends Component {
  render() {
    const {
      id,
      title,
      author,
      timestamp,
      commentCount,
      body,
      category,
      voteScore,
      onUpVote,
      onDownVote,
      onEditItem,
      onDeleteItem,
      categories,
      onOpenModal,
      onCloseModal,
      isEditing,
    } = this.props;
    return (
      <div className="post">
        <ModalContainer onClose={() => onCloseModal()} open={isEditing}>
          <EditPost
            onClose={() => onCloseModal()}
            onEditPost={onEditItem}
            id={id}
            title={title}
            author={author}
            body={body}
            category={category}
            categories={categories}
          />
        </ModalContainer>
        <div className="post-title">
          <Typography variant="display1" gutterBottom>
            {title}
          </Typography>
        </div>
        <div className="post-info">
          <VotingControls
            id={id}
            voteScore={voteScore}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
          />
          <div className="list__controls-right">
            <EditDeleteControls
              id={id}
              onDeleteItem={onDeleteItem}
              onEditItem={onOpenModal}
            />
          </div>
        </div>
        <Typography variant="body2" gutterBottom>
          <ItemInfo
            author={author}
            timestamp={timestamp}
            commentCount={commentCount}
          />
        </Typography>
        <div className="post-body">
          <Typography style={style} variant="body1" gutterBottom>
            {body}
          </Typography>
        </div>
      </div>
    );
  }
}

export default PostDetails;
