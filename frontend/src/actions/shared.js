import { getInitialData } from "../utils/api";
import { fetchCategories } from "../actions/categories";
import { fetchPostsSucceeded } from "../actions/posts";

export function fetchInitialData() {
  return dispatch => {
    return getInitialData().then(({ categories, posts }) => {
      dispatch(fetchCategories(categories));
      dispatch(fetchPostsSucceeded(posts));
    });
  };
}
