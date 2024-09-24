import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

const ActionType = {
  RECEIVE_THREAD_DETAIL: "RECEIVE_THREAD_DETAIL",
  CLEAR_THREAD_DETAIL: "CLEAR_THREAD_DETAIL",
  SET_THREAD_ERROR: "SET_THREAD_ERROR",
  SET_THREAD_LOADING: "SET_THREAD_LOADING",
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function setThreadErrorActionCreator(error) {
  return {
    type: ActionType.SET_THREAD_ERROR,
    payload: {
      error,
    },
  };
}

function setThreadLoadingActionCreator(isLoading) {
  return {
    type: ActionType.SET_THREAD_LOADING,
    payload: {
      isLoading,
    },
  };
}

function asyncFetchThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      dispatch(setThreadErrorActionCreator(error.message));
    } finally {
      dispatch(setThreadLoadingActionCreator(false));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  setThreadErrorActionCreator,
  setThreadLoadingActionCreator,
  asyncFetchThreadDetail,
};
