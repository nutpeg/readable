import {
  FETCH_POSTS_STARTED,
  FETCH_POSTS_SUCCEEDED,
  UPVOTE,
  DOWNVOTE,
} from '../actions/posts';

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
    case UPVOTE:
      console.log('id', state.posts[action.postId]);
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
    default:
      return state;
  }
}
