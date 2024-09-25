/* - asyncCreateThread thunk
- should dispatch actions correctly when data fetching is successful
- should dispatch actions and set error correctly when data fetching fails */

import { afterEach, it, vi, describe, expect, beforeEach } from "vitest";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import {
  asyncCreateThread,
  createThreadRequest,
  createThreadSuccess,
  createThreadFailure,
} from "./action";

const fakeThreadResponse = {
  id: "thread-1",
  title: "Ini adalah thread pertama",
  body: "Konten dari thread pertama",
  category: "general",
  createdAt: "2021-06-21T07:00:00.000Z",
  owner: {
    id: "users-1",
    name: "John Doe",
    email: "john@example.com",
  },
};

const fakeErrorResponse = new Error("Ups, something went wrong");

describe("asyncCreateThread thunk", () => {
  beforeEach(() => {
    vi.spyOn(api, "createThread");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should dispatch actions correctly when data fetching is successful", async () => {
    // Arrange
    const threadData = {
      title: "Ini adalah thread pertama",
      body: "Konten dari thread pertama",
      category: "general",
    };
    api.createThread.mockResolvedValue(fakeThreadResponse);

    const dispatch = vi.fn();

    // Action
    await asyncCreateThread(threadData)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(createThreadRequest());
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      createThreadSuccess(fakeThreadResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch actions and set error correctly when data fetching fails", async () => {
    // Arrange
    const threadData = {
      title: "Ini adalah thread pertama",
      body: "Konten dari thread pertama",
      category: "general",
    };
    api.createThread.mockRejectedValue(fakeErrorResponse);

    const dispatch = vi.fn();

    // Action
    await asyncCreateThread(threadData)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(createThreadRequest());
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      createThreadFailure(fakeErrorResponse.message)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
