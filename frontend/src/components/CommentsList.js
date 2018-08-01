import React, { Component } from 'react';
import CommentsListItemContainer from '../containers/CommentsListItemContainer';

class CommentsList extends Component {
  render() {
    const { isLoadingComments, comments } = this.props;
    return (
      <div className="comments-list">
        {!isLoadingComments && (
          <ul>
            {comments.map(comment => (
              <li className="comment-item" key={comment.id}>
                <CommentsListItemContainer item={comment} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default CommentsList;
