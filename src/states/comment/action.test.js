import { afterEach, it, vi, describe, expect, beforeEach } from "vitest";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { asyncAddComment, addCommentActionCreator, setErrorActionCreator } from "./action";


const fakeCommentResponse = {
  id: "comment-1",
  content: "Ini adalah komentar pertama",
  createdAt: "2021-06-21T07:00:00.000Z",
  upVotesBy: [],
  downVotesBy: [],
  owner: {
    id: "users-1",
    name: "John Doe",
    email: "john@example.com",
  },
};

const fakeErrorResponse = new Error("Ups, something went wrong");

describe("asyncAddComment thunk", () => {
  beforeEach(() => {
    // Backup 
    vi.spyOn(api, "createComment");
  });

  afterEach(() => {
    // Restore 
    vi.restoreAllMocks();
  });

  it("should dispatch actions correctly when data fetching is successful", async () => {
    // Arrange
    const threadId = "thread-1";
    const content = "This is a new comment";
    api.createComment.mockResolvedValue(fakeCommentResponse);

    const dispatch = vi.fn(); 

    // Action
    await asyncAddComment(threadId, content)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addCommentActionCreator(fakeCommentResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch actions and set error correctly when data fetching fails", async () => {
    // Arrange
    const threadId = "thread-1";
    const content = "This is a new comment";
    api.createComment.mockRejectedValue(fakeErrorResponse); 

    const dispatch = vi.fn(); 

    // Action
    await asyncAddComment(threadId, content)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setErrorActionCreator(fakeErrorResponse.message));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
