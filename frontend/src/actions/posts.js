import * as API from '../utils/api.js';

export const FETCH_POSTS_SUCCEEDED = 'FETCH_POSTS_SUCCEEDED';
export const FETCH_POSTS_STARTED = 'FETCH_POSTS_STARTED';
export const FETCH_POST_SUCCEEDED = 'FETCH_POST_SUCCEEDED';
export const FETCH_POST_STARTED = 'FETCH_POST_STARTED';
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';
export const SORT_POSTS = 'SORT_POSTS';
export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';
export const DELETE_POST = 'DELETE_POST';
export const CREATE_POST_SUCCEEDED = 'CREATE_POST_SUCCEEDED';

export const fetchPostsStarted = () => ({
  type: FETCH_POSTS_STARTED,
});

export const fetchPostsSucceeded = posts => ({
  type: FETCH_POSTS_SUCCEEDED,
  posts,
});

export const fetchPostStarted = () => ({
  type: FETCH_POST_STARTED,
});

export const fetchPostsFailed = error => ({
  type: FETCH_POSTS_FAILED,
  error,
});

export const fetchPostSucceeded = post => ({
  type: FETCH_POST_SUCCEEDED,
  post,
});

export const sortPosts = sortOrder => ({
  type: SORT_POSTS,
  sortOrder,
});

export const fetchPosts = () => {
  return dispatch => {
    dispatch(fetchPostsStarted());
    API.getPosts()
      .then(posts => {
      dispatch(fetchPostsSucceeded(posts));
    })
    .catch(error => {
      dispatch(fetchPostsFailed(error.message))
    });
  };
};

export const fetchPost = id => {
  return dispatch => {
    dispatch(fetchPostStarted());
    API.getPost(id).then(post => {
      dispatch(fetchPostSucceeded(post));
    });
  };
};

export const vote = (id, direction) => {
  return dispatch => {
    API.vote(id, direction).then(posts => {
      direction === 'upVote' ? dispatch(upVote(id)) : dispatch(downVote(id));
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

export const deletePost = id => {
  return dispatch => {
    API.deletePost(id).then(resp => {
      dispatch(deletePostSucceeded(id));
    });
  };
};

export const deletePostSucceeded = postId => ({
  type: DELETE_POST,
  postId,
});

export const createPostSucceeded = post => ({
  type: CREATE_POST_SUCCEEDED,
  post,
});

export const createPost = ({ author, title, body, category }) => {
  const timestamp = Date.now();
  return dispatch => {
    API.createPost({
      author,
      title,
      body,
      category,
      id: `${timestamp}`,
      timestamp,
    }).then(post => {
      dispatch(createPostSucceeded(post));
    });
  };
};
