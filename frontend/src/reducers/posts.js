import { FETCH_POSTS_STARTED, FETCH_POSTS_SUCCEEDED } from "../actions/posts";

const initialState = {
  posts: [],
  isLoadingPosts: false,
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
    default:
      return state;
  }
}
