import {
  FETCH_POSTS_STARTED,
  FETCH_POSTS_SUCCEEDED,
  UPVOTE,
  DOWNVOTE,
  SORT_POSTS,
} from '../actions/posts';

const initialState = {
  posts: [],
  isLoadingPosts: false,
  sortOrder: 'timestamp',
};

const sortPosts = (posts, sortOrder) => {
  if (sortOrder === 'timestamp') {
    return posts.sort((a, b) => {
      return a.timestamp < b.timestamp;
    });
  } else if (sortOrder === 'votes') {
    return posts.sort((a, b) => {
      return a.voteScore < b.voteScore
    });
  } else {
    return posts;
  }
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
        posts: sortPosts(state.posts.slice(), action.sortOrder),
        sortOrder: action.sortByValue,
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
    default:
      return state;
  }
}
