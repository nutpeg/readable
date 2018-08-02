import * as API from '../utils/api.js';
import { incrementCommentCount } from './posts';
import { decrementCommentCount } from './posts';

export const FETCH_COMMENTS_STARTED = 'FETCH_COMMENTS_STARTED';
export const FETCH_COMMENTS_SUCCEEDED = 'FETCH_COMMENTS_SUCCEEDED';
export const FETCH_COMMENTS_FAILED = 'FETCH_COMMENTS_FAILED';
export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';
export const CREATE_COMMENT_STARTED = 'CREATE_COMMENT_STARTED';
export const CREATE_COMMENT_SUCCEEDED = 'CREATE_COMMENT_SUCCEEDED';
export const CREATE_COMMENT_FAILED = 'CREATE_COMMENT_FAILED';
export const EDIT_COMMENT_STARTED = 'EDIT_COMMENT_STARTED';
export const EDIT_COMMENT_SUCCEEDED = 'EDIT_COMMENT_SUCCEEDED';
export const EDIT_COMMENT_FAILED = 'EDIT_COMMENT_FAILED';
export const CANCEL_EDIT_COMMENT = 'CANCEL_EDIT_COMMENT';
export const DELETE_COMMENT_SUCCEEDED = 'DELETE_COMMENT_SUCCEEDED';
export const DELETE_COMMENT_FAILED = 'DELETE_COMMENT_FAILED';

export const fetchCommentsStarted = () => ({
  type: FETCH_COMMENTS_STARTED,
});

export const fetchCommentsSucceeded = comments => ({
  type: FETCH_COMMENTS_SUCCEEDED,
  comments,
});

export const fetchCommentsFailed = error => ({
  type: FETCH_COMMENTS_FAILED,
  error,
});

export const fetchComments = id => {
  return dispatch => {
    dispatch(fetchCommentsStarted());
    API.getComments(id)
      .then(comments => {
        dispatch(fetchCommentsSucceeded(comments));
      })
      .catch(error => {
        dispatch(
          fetchCommentsFailed(
            `Error loading comments: ${error.message}. Please try again`,
          ),
        );
      });
  };
};

export const commentVote = (id, direction) => {
  return dispatch => {
    API.commentVote(id, direction).then(() => {
      direction === 'upVote' ? dispatch(upVote(id)) : dispatch(downVote(id));
    });
  };
};

export const upVote = commentId => ({
  type: UPVOTE,
  commentId,
});

export const downVote = commentId => ({
  type: DOWNVOTE,
  commentId,
});

export const createCommentStarted = () => ({
  type: CREATE_COMMENT_STARTED,
});

export const createCommentSucceeded = comment => ({
  type: CREATE_COMMENT_SUCCEEDED,
  comment,
});

export const createCommentFailed = error => ({
  type: CREATE_COMMENT_FAILED,
  error,
});

export const createComment = ({ author, body, parentId }) => {
  const timestamp = Date.now();
  return dispatch => {
    dispatch(createCommentStarted());
    API.createComment({
      author,
      body,
      id: `${timestamp}`,
      parentId,
      timestamp,
    })
      .then(comment => {
        dispatch(createCommentSucceeded(comment));
      })
      .then(() => {
        dispatch(incrementCommentCount(parentId));
      })
      .catch(error => {
        dispatch(
          createCommentFailed(
            `Error creating comment: ${error.message}. Please try again`,
          ),
        );
      });
  };
};

export const deleteCommentSucceeded = commentId => ({
  type: DELETE_COMMENT_SUCCEEDED,
  commentId,
});

export const deleteCommentFailed = commentId => ({
  type: DELETE_COMMENT_FAILED,
  commentId,
});

export const deleteComment = (id, parentId) => {
  return dispatch => {
    API.deleteComment(id)
      .then(() => {
        dispatch(deleteCommentSucceeded(id));
      })
      .then(()=> {
        dispatch(decrementCommentCount(parentId));
      })
      .catch(error => {
        dispatch(
          deleteCommentFailed(
            `Error deleting comment: ${error.message}. Please try again`,
          ),
        );
      });
  };
};

export const editCommentStarted = () => ({
  type: EDIT_COMMENT_STARTED,
});

export const editCommentFailed = error => ({
  type: EDIT_COMMENT_FAILED,
  error,
});

export const editCommentSucceeded = comment => ({
  type: EDIT_COMMENT_SUCCEEDED,
  comment,
});

export const cancelEditComment = () => ({
  type: CANCEL_EDIT_COMMENT,
});

export const editComment = (id, comment) => {
  return dispatch => {
    API.editComment(id, comment)
      .then(res => {
        dispatch(editCommentSucceeded(res));
      })
      .catch(error => {
        dispatch(
          editCommentFailed(
            `Error editing comment: ${error.message}. Please try again`,
          ),
        );
      });
  };
};
