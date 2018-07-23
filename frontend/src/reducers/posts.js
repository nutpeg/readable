import {
  FETCH_POSTS_STARTED,
  FETCH_POSTS_SUCCEEDED,
  FETCH_POST_STARTED,
  FETCH_POST_SUCCEEDED,
  FETCH_POSTS_FAILED,
  UPVOTE,
  DOWNVOTE,
  SORT_POSTS,
  DELETE_POST,
  CREATE_POST_SUCCEEDED,
} from '../actions/posts';

const initialState = {
  posts: [],
  isLoading: false,
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
      };
    case FETCH_POSTS_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        posts: action.posts,
      };
    case FETCH_POST_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_POSTS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case FETCH_POST_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        posts: state.posts.map(
          post => (post.id === action.post.id ? action.post : post),
        ),
      };
    case SORT_POSTS:
      return {
        ...state,
        sortOrder: action.sortOrder,
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
    case DELETE_POST:
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
