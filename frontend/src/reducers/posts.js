import {
  FETCH_POSTS_STARTED,
  FETCH_POSTS_SUCCEEDED,
  FETCH_POSTS_FAILED,
  FETCH_POST_STARTED,
  FETCH_POST_SUCCEEDED,
  FETCH_POST_FAILED,
  EDIT_POST_STARTED,
  EDIT_POST_SUCCEEDED,
  EDIT_POST_FAILED,
  CANCEL_ERROR,
  UPVOTE,
  DOWNVOTE,
  SORT_POSTS,
  DELETE_POST_SUCCEEDED,
  CREATE_POST_SUCCEEDED,
} from '../actions/posts';

const initialState = {
  posts: [],
  isLoading: false,
  isEditing: false,
  sortOrder: 'timestamp',
  error: null,
};

const removeDeleted = items => items.filter(item => !item.deleted);

export const getSortedPosts = (posts, sortOrder) => {
  return removeDeleted(posts).sort((a, b) => a[sortOrder] < b[sortOrder]);
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_POSTS_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        posts: action.posts,
      };
    case FETCH_POSTS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case SORT_POSTS:
      return {
        ...state,
        sortOrder: action.sortOrder,
      };
    case FETCH_POST_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_POST_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        posts: state.posts.map(
          post => (post.id === action.post.id ? action.post : post),
        ),
      };
    case FETCH_POST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case EDIT_POST_STARTED:
      return {
        ...state,
        isEditing: true,
        error: null,
      };
    case EDIT_POST_SUCCEEDED:
      return {
        ...state,
        isEditing: false,
        posts: state.posts.map(
          post => (post.id === action.post.id ? action.post : post),
        ),
      };
    case EDIT_POST_FAILED:
      return {
        ...state,
        isEditing: false,
        error: action.error,
      };
    case CANCEL_ERROR:
      return {
        ...state,
        error: null,
      };
    case UPVOTE:
      return {
        ...state,
        posts: state.posts.map(
          post =>
            post.id === action.postId
              ? { ...post, voteScore: post.voteScore + 1 }
              : post,
        ),
      };
    case DOWNVOTE:
      return {
        ...state,
        posts: state.posts.map(
          post =>
            post.id === action.postId
              ? { ...post, voteScore: post.voteScore - 1 }
              : post,
        ),
      };
    case DELETE_POST_SUCCEEDED:
      return {
        ...state,
        posts: state.posts.map(
          post =>
            post.id === action.postId ? { ...post, deleted: true } : post,
        ),
      };
    case CREATE_POST_SUCCEEDED:
      return {
        ...state,
        posts: [...state.posts, action.post],
      };
    default:
      return state;
  }
}
