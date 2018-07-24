import {
  FETCH_CATEGORIES_SUCCEEDED,
  FETCH_CATEGORIES_STARTED,
} from "../actions/categories";
import capitalize from '../utils/capitalize';

const initialState = {
  categories: [],
  isLoadingCategories: false,
};

export const getCapitalizedCategories = (categories) => {
  return categories.map(category => {
    return {...category, name: capitalize(category.name)}
  }
  )
}

export default function categories(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_STARTED:
      return {
        ...state,
        isLoadingCategories: true,
      };
    case FETCH_CATEGORIES_SUCCEEDED:
      return {
        ...state,
        isLoadingCategories: false,
        categories: action.categories,
      };
    default:
      return state;
  }
}
