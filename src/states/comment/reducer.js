import { ActionType } from "./action";

function commentReducer(state = { comments: [], error: null }, action = {}) {
  switch (action.type) {
    case ActionType.ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload.comment, ...state.comments],
      };
    case ActionType.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export default commentReducer;
