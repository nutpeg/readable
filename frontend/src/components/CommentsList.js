import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import CommentListItemContainer from '../containers/CommentListItemContainer';
import Divider from '@material-ui/core/Divider';

class CommentsList extends Component {
  render() {
    const { isLoadingComments, comments } = this.props;
    return (
      <div className="comments-list">
        {!isLoadingComments && (
          <ul>
            {comments.map(comment => (
              <li className="post-item" key={comment.id}>
                <CommentListItemContainer item={comment} />
                <Typography variant="body1" gutterBottom>
                  {comment.body}
                </Typography>
                <Divider />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default CommentsList;
