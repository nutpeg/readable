import * as API from '../utils/api.js';

export const FETCH_POSTS_SUCCEEDED = 'FETCH_POSTS_SUCCEEDED';
export const FETCH_POSTS_STARTED = 'FETCH_POSTS_STARTED';
export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';

export const fetchPostsStarted = () => ({
  type: FETCH_POSTS_STARTED,
});

export const fetchPostsSucceeded = posts => ({
  type: FETCH_POSTS_SUCCEEDED,
  posts,
});

export const fetchPosts = () => {
  return dispatch => {
    dispatch(fetchPostsStarted());
    API.getPosts().then(posts => {
      setTimeout(() => {
        dispatch(fetchPostsSucceeded(posts));
      }, 20);
    });
  };
};

export const vote = (id, direction) => {
  return dispatch => {
    API.vote(id, direction).then(posts => {
      direction === 'up' ? dispatch(upVote(id)) : dispatch(downVote(id));
    });
  };
};

export const upVote = postId => ({
  type: UPVOTE,
  postId,
});

export const downVote = postId => ({
  type: DOWNVOTE,
  postId,
});
