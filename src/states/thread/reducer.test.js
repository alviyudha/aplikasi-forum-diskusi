/* test scenario threadReducer
should return the initial state when given an unknown action
should set loading to true when CREATE_THREAD_REQUEST is dispatched
should set loading to false and set thread when CREATE_THREAD_SUCCESS is dispatched
should set loading to false and set error when CREATE_THREAD_FAILURE is dispatched */

import { describe, it, expect } from 'vitest';
import threadReducer from './reducer';
import { ActionType } from './action';

describe('threadReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    // arrange
    const initialState = {
      loading: false,
      thread: null,
      error: null,
    };

    // action
    const action = { type: 'UNKNOWN_ACTION' };
    const result = threadReducer(undefined, action);

    // assert
    expect(result).toEqual(initialState);
  });

  it('should set loading to true when CREATE_THREAD_REQUEST is dispatched', () => {
    // arrange
    const initialState = {
      loading: false,
      thread: null,
      error: null,
    };

    // action
    const action = { type: ActionType.CREATE_THREAD_REQUEST };
    const result = threadReducer(initialState, action);

    // assert
    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should set loading to false and set thread when CREATE_THREAD_SUCCESS is dispatched', () => {
    // arrange
    const initialState = {
      loading: true,
      thread: null,
      error: null,
    };

    const threadData = { id: '1', title: 'New Thread' };

    // action
    const action = {
      type: ActionType.CREATE_THREAD_SUCCESS,
      payload: { thread: threadData },
    };
    const result = threadReducer(initialState, action);

    // assert
    expect(result.loading).toBe(false);
    expect(result.thread).toEqual(threadData);
    expect(result.error).toBeNull();
  });

  it('should set loading to false and set error when CREATE_THREAD_FAILURE is dispatched', () => {
    // arrange
    const initialState = {
      loading: true,
      thread: null,
      error: null,
    };

    const error = 'Failed to create thread';

    // action
    const action = {
      type: ActionType.CREATE_THREAD_FAILURE,
      payload: { error },
    };
    const result = threadReducer(initialState, action);

    // assert
    expect(result.loading).toBe(false);
    expect(result.error).toBe(error);
    expect(result.thread).toBeNull();
  });
});
