import * as API from '../utils/api.js';

export const FETCH_COMMENTS_STARTED = 'FETCH_COMMENTS_STARTED';
export const FETCH_COMMENTS_SUCCEEDED = 'FETCH_COMMENTS_SUCCEEDED';
export const FETCH_COMMENTS_FAILED = 'FETCH_COMMENTS_FAILED';
export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';
export const CREATE_COMMENT_STARTED = 'CREATE_COMMENT_STARTED';
export const CREATE_COMMENT_SUCCEEDED = 'CREATE_COMMENT_SUCCEEDED';
export const CREATE_COMMENT_FAILED = 'CREATE_COMMENT_FAILED';
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

export const deleteComment = id => {
  return dispatch => {
    API.deleteComment(id)
      .then(resp => {
        dispatch(deleteCommentSucceeded(id));
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
