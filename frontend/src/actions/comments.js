import * as API from '../utils/api.js';

export const FETCH_COMMENTS_STARTED = 'FETCH_COMMENTS_STARTED';
export const FETCH_COMMENTS_SUCCEEDED = 'FETCH_COMMENTS_SUCCEEDED';
export const FETCH_COMMENTS_FAILED = 'FETCH_COMMENTS_FAILED';
export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';

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

export const fetchComments = (id) => {
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

// Change API to voteComment
export const commentVote = (id, direction) => {
  return dispatch => {
    API.commentVote(id, direction).then(posts => {
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
})
