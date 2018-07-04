import { getPosts } from "../utils/api.js";

export const FETCH_POSTS_SUCCEEDED = "FETCH_POSTS_SUCCEEDED";
export const FETCH_POSTS_STARTED = "FETCH_POSTS_STARTED";

export function fetchPostsStarted() {
  return {
    type: FETCH_POSTS_STARTED,
  };
}

export function fetchPostsSucceeded(posts) {
  return { type: FETCH_POSTS_SUCCEEDED, posts };
}

export function fetchPosts() {
  return dispatch => {
    dispatch(fetchPostsStarted());
    getPosts().then(posts => {
      setTimeout(() => {
        dispatch(fetchPostsSucceeded(posts));
      }, 20);
    });
  };
}
