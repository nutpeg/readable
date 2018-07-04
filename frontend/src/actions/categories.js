import { getCategories } from "../utils/api.js";

export const FETCH_CATEGORIES_SUCCEEDED = "FETCH_CATEGORIES_SUCCEEDED";
export const FETCH_CATEGORIES_STARTED = "FETCH_CATEGORIES_STARTED";

export function fetchCategoriesStarted() {
  return {
    type: FETCH_CATEGORIES_STARTED,
  };
}

export function fetchCategoriesSucceeded(categories) {
  return { type: FETCH_CATEGORIES_SUCCEEDED, categories: categories };
}

export function fetchCategories() {
  return dispatch => {
    dispatch(fetchCategoriesStarted());
    getCategories().then(categories => {
      setTimeout(() => {
        dispatch(fetchCategoriesSucceeded(categories));
      }, 10);
    });
  };
}
