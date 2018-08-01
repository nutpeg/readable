import React, { Component } from 'react';
// import Typography from '@material-ui/core/Typography';
import CommentsListItemContainer from '../containers/CommentsListItemContainer';
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
                <CommentsListItemContainer item={comment} />
                {/* <Typography variant="body1" gutterBottom>
                  {comment.body}
                </Typography> */}
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
