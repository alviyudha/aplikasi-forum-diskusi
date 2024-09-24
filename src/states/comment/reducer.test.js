/* test scenario threadReducer
commentReducer function
should return the initial state when given an unknown action
should add new comment when given ADD_COMMENT action
should set error when given SET_ERROR action */

import { describe, it, expect } from 'vitest';
import { ActionType } from './action';
import commentReducer from './reducer';

describe('commentReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const initialState = { comments: [], error: null };
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = commentReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should add new comment when given ADD_COMMENT action', () => {
    // Arrange
    const initialState = { comments: [], error: null };
    const newComment = { id: 1, text: 'New Comment' };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: newComment,
      },
    };

    // Action
    const nextState = commentReducer(initialState, action);

    // Assert
    expect(nextState.comments).toContain(newComment);
    expect(nextState.error).toBeNull();
  });

  it('should set error when given SET_ERROR action', () => {
    // Arrange
    const initialState = { comments: [], error: null };
    const action = {
      type: ActionType.SET_ERROR,
      payload: {
        error: 'Error occurred',
      },
    };

    // Action
    const nextState = commentReducer(initialState, action);

    // Assert
    expect(nextState.error).toBe('Error occurred');
    expect(nextState.comments).toEqual([]);
  });
});