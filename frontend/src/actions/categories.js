import { getCategories } from "../utils/api.js";

export const FETCH_CATEGORIES_SUCCEEDED = "FETCH_CATEGORIES_SUCCEEDED";
export const FETCH_CATEGORIES_STARTED = "FETCH_CATEGORIES_STARTED";

export const fetchCategoriesStarted = () => (
  {
    type: FETCH_CATEGORIES_STARTED,
  }
)

export const fetchCategoriesSucceeded = categories => (
  {
    type: FETCH_CATEGORIES_SUCCEEDED,
    categories: categories,
  }
)

export const fetchCategories = () => {
  return dispatch => {
    dispatch(fetchCategoriesStarted());
    getCategories().then(categories => {
      setTimeout(() => {
        dispatch(fetchCategoriesSucceeded(categories));
      }, 10);
    });
  };
}
