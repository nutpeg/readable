import {
  FETCH_POSTS_STARTED,
  FETCH_POSTS_SUCCEEDED,
  UPVOTE,
  DOWNVOTE,
  SORT_POSTS,
  DELETE_POST,
  CREATE_POST_SUCCEEDED,
} from '../actions/posts';

const initialState = {
  posts: [],
  isLoadingPosts: false,
  sortOrder: 'timestamp',
};

export const getSortedPosts = (posts, sortOrder) => {
  return posts.sort((a, b) => a[sortOrder] < b[sortOrder]);
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_STARTED:
      return {
        ...state,
        isLoadingPosts: true,
      };
    case FETCH_POSTS_SUCCEEDED:
      return {
        ...state,
        isLoadingPosts: false,
        posts: action.posts,
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
        posts: state.posts.filter(post => post.id !== action.postId),
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
