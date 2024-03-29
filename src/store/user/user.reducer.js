import USER_ACTION_TYPES from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

export const userReducer = (state = INITIAL_STATE, action = {}) => {
  console.log("dispatched");
  console.log("userReducer action", action);
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
      return { ...state, error: payload };
    default:
      // Actions are passed to every single reducer in the app.
      // If this paraticular reducer is not affected, just return the original state.
      return state;
  }
};
