import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

const ActionType = {
  ADD_COMMENT: "ADD_COMMENT",
  SET_ERROR: "SET_ERROR",
};

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function setErrorActionCreator(error) {
  return {
    type: ActionType.SET_ERROR,
    payload: {
      error,
    },
  };
}

function asyncAddComment(threadId, content) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const newComment = await api.createComment(threadId, content);
      dispatch(addCommentActionCreator(newComment));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  addCommentActionCreator,
  asyncAddComment,
  setErrorActionCreator,
};
