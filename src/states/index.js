/**
 * @TODO: Create Redux store
 */

import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./authUser/reducer";
import isPreloadReducer from "./isPreload/reducer";
import usersReducer from "./users/reducer";
import threadReducer from "./thread/reducer";
import commentReducer from "./comment/reducer";
import { loadingBarReducer } from "react-redux-loading-bar";
import threadDetailReducer from "./threadDetail/reducer";
import threadListReducer from "./threadList/reducer";
const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    thread: threadReducer,
    comment: commentReducer,
    loadingBar: loadingBarReducer,
    threadDetail: threadDetailReducer,
    threadList: threadListReducer,
  },
});

export default store;
