import * as API from '../utils/api.js';

export const FETCH_POSTS_SUCCEEDED = 'FETCH_POSTS_SUCCEEDED';
export const FETCH_POSTS_STARTED = 'FETCH_POSTS_STARTED';
export const SORT_POSTS = 'SORT_POSTS';
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';
export const FETCH_POST_STARTED = 'FETCH_POST_STARTED';
export const FETCH_POST_SUCCEEDED = 'FETCH_POST_SUCCEEDED';
export const FETCH_POST_FAILED = 'FETCH_POST_FAILED';
export const EDIT_POST_STARTED = 'EDIT_POST_STARTED';
export const EDIT_POST_SUCCEEDED = 'EDIT_POST_SUCCEEDED';
export const EDIT_POST_FAILED = 'EDIT_POST_FAILED';
export const CANCEL_EDIT = 'CANCEL_EDIT';
export const CANCEL_ERROR = 'CANCEL_ERROR';
export const UPVOTE = 'UPVOTE';
export const DOWNVOTE = 'DOWNVOTE';
export const DELETE_POST_SUCCEEDED = 'DELETE_POST_SUCCEEDED';
export const DELETE_POST_FAILED = 'DELETE_POST_FAILED';
export const CREATE_POST_SUCCEEDED = 'CREATE_POST_SUCCEEDED';
export const CREATE_POST_FAILED = 'CREATE_POST_FAILED';
export const INCREMENT_COMMENT_COUNT = 'INCREMENT_COMMENT_COUNT';
export const DECREMENT_COMMENT_COUNT = 'DECREMENT_COMMENT_COUNT';

export const fetchPostsStarted = () => ({
  type: FETCH_POSTS_STARTED,
});

export const fetchPostsSucceeded = posts => ({
  type: FETCH_POSTS_SUCCEEDED,
  posts,
});

export const sortPosts = sortOrder => ({
  type: SORT_POSTS,
  sortOrder,
});

export const fetchPostsFailed = error => ({
  type: FETCH_POSTS_FAILED,
  error,
});

export const fetchPostStarted = () => ({
  type: FETCH_POST_STARTED,
});

export const fetchPostFailed = error => ({
  type: FETCH_POST_FAILED,
  error,
});

export const fetchPostSucceeded = post => ({
  type: FETCH_POST_SUCCEEDED,
  post,
});

export const editPostStarted = () => ({
  type: EDIT_POST_STARTED,
});

export const editPostFailed = error => ({
  type: EDIT_POST_FAILED,
  error,
});

export const editPostSucceeded = post => ({
  type: EDIT_POST_SUCCEEDED,
  post,
});

export const cancelEdit = () => ({
  type: CANCEL_EDIT,
});

export const cancelError = () => ({
  type: CANCEL_ERROR,
});

export const fetchPosts = () => {
  return dispatch => {
    dispatch(fetchPostsStarted());
    API.getPosts()
      .then(posts => {
        dispatch(fetchPostsSucceeded(posts));
      })
      .catch(error => {
        dispatch(
          fetchPostsFailed(
            `Error loading posts: ${error.message}. Please try again`,
          ),
        );
      });
  };
};

export const fetchPost = id => {
  return dispatch => {
    dispatch(fetchPostStarted());
    API.getPost(id)
      .then(post => {
        dispatch(fetchPostSucceeded(post));
      })
      .catch(error => {
        dispatch(
          fetchPostsFailed(
            `Error loading post: ${
              error.message
            }. The post may not exist, or you could try again`,
          ),
        );
      });
  };
};

export const vote = (id, direction) => {
  return dispatch => {
    API.vote(id, direction).then( () => {
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

export const deletePostSucceeded = postId => ({
  type: DELETE_POST_SUCCEEDED,
  postId,
});

export const deletePostFailed = postId => ({
  type: DELETE_POST_FAILED,
  postId,
});

export const deletePost = id => {
  return dispatch => {
    API.deletePost(id)
      .then(resp => {
        dispatch(deletePostSucceeded(id));
      })
      .catch(error => {
        dispatch(
          deletePostFailed(
            `Error deleting post: ${error.message}. Please try again`,
          ),
        );
      });
  };
};

export const createPostSucceeded = post => ({
  type: CREATE_POST_SUCCEEDED,
  post,
});

export const createPostFailed = error => ({
  type: CREATE_POST_FAILED,
  error,
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
    })
      .then(post => {
        dispatch(createPostSucceeded(post));
      })
      .catch(error => {
        dispatch(
          createPostFailed(
            `Error creating post: ${error.message}. Please try again`,
          ),
        );
      });
  };
};

export const editPost = (id, post) => {
  return dispatch => {
    dispatch(editPostStarted());
    API.editPost(id, post)
      .then(post => {
        dispatch(editPostSucceeded(post));
      })
      .catch(error => {
        dispatch(
          editPostFailed(
            `Error editing post: ${error.message}. Please try again`,
          ),
        );
      });
  };
};

export const incrementCommentCount = (postId) => ({
  type: INCREMENT_COMMENT_COUNT,
  postId,
})

export const decrementCommentCount = (postId) => ({
  type: DECREMENT_COMMENT_COUNT,
  postId,
})
