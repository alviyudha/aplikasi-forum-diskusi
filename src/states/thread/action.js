import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

const ActionType = {
  CREATE_THREAD_REQUEST: "CREATE_THREAD_REQUEST",
  CREATE_THREAD_SUCCESS: "CREATE_THREAD_SUCCESS",
  CREATE_THREAD_FAILURE: "CREATE_THREAD_FAILURE",
};

function createThreadRequest() {
  return {
    type: ActionType.CREATE_THREAD_REQUEST,
  };
}

function createThreadSuccess(thread) {
  return {
    type: ActionType.CREATE_THREAD_SUCCESS,
    payload: {
      thread,
    },
  };
}

function createThreadFailure(error) {
  return {
    type: ActionType.CREATE_THREAD_FAILURE,
    payload: {
      error,
    },
  };
}

function asyncCreateThread(threadData) {
  return async (dispatch) => {
    dispatch(createThreadRequest());
    dispatch(showLoading());
    try {
      const thread = await api.createThread(threadData);
      dispatch(createThreadSuccess(thread));
    } catch (error) {
      dispatch(createThreadFailure(error.message));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  asyncCreateThread,
  createThreadRequest,
  createThreadSuccess,
  createThreadFailure,
};
