import {
  FETCH_COMMENTS_STARTED,
  FETCH_COMMENTS_SUCCEEDED,
  FETCH_COMMENTS_FAILED,
  // FETCH_COMMENT_STARTED,
  // FETCH_COMMENT_SUCCEEDED,
  // FETCH_COMMENT_FAILED,
  // EDIT_COMMENT_STARTED,
  // EDIT_COMMENT_SUCCEEDED,
  // EDIT_COMMENT_FAILED,
  // CANCEL_EDIT,
  // CANCEL_ERROR,
  // UPVOTE,
  // DOWNVOTE,
  // DELETE_COMMENT_SUCCEEDED,
  // CREATE_COMMENT_SUCCEEDED,
} from '../actions/comments';

const initialState = {
  comments: [],
  isLoading: false,
  isEditing: false,
  error: null,
};

const removeDeleted = items => items.filter(item => !item.deleted);

export const getSortedComments = (comments) => {
  return removeDeleted(comments).sort((a, b) => a['timestamp'] < b['timestamp']);
};

export default function comments(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENTS_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_COMMENTS_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        comments: action.comments,
      };
    case FETCH_COMMENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    // case FETCH_COMMENT_STARTED:
    //   return {
    //     ...state,
    //     isLoading: true,
    //     error: null,
    //   };
    // case FETCH_COMMENT_SUCCEEDED:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     comments: state.comments.map(
    //       comment => (comment.id === action.comment.id ? action.comment : comment),
    //     ),
    //   };
    // case FETCH_COMMENT_FAILED:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     error: action.error,
    //   };
    // case EDIT_COMMENT_STARTED:
    //   return {
    //     ...state,
    //     isEditing: true,
    //     error: null,
    //   };
    // case EDIT_COMMENT_SUCCEEDED:
    //   return {
    //     ...state,
    //     isEditing: false,
    //     comments: state.comments.map(
    //       comment => (comment.id === action.comment.id ? action.comment : comment),
    //     ),
    //   };
    // case EDIT_COMMENT_FAILED:
    //   return {
    //     ...state,
    //     isEditing: false,
    //     error: action.error,
    //   };
    // case CANCEL_EDIT:
    //   return {
    //     ...state,
    //     isEditing: false,
    //   };
    // case CANCEL_ERROR:
    //   return {
    //     ...state,
    //     error: null,
    //   };
    // case UPVOTE:
    //   return {
    //     ...state,
    //     comments: state.comments.map(
    //       comment =>
    //         comment.id === action.commentId
    //           ? { ...comment, voteScore: comment.voteScore + 1 }
    //           : comment,
    //     ),
    //   };
    // case DOWNVOTE:
    //   return {
    //     ...state,
    //     comments: state.comments.map(
    //       comment =>
    //         comment.id === action.commentId
    //           ? { ...comment, voteScore: comment.voteScore - 1 }
    //           : comment,
    //     ),
    //   };
    // case DELETE_COMMENT_SUCCEEDED:
    //   return {
    //     ...state,
    //     comments: state.comments.map(
    //       comment =>
    //         comment.id === action.commentId ? { ...comment, deleted: true } : comment,
    //     ),
    //   };
    // case CREATE_COMMENT_SUCCEEDED:
    //   return {
    //     ...state,
    //     comments: [...state.comments, action.comment],
    //   };
    default:
      return state;
  }
}
