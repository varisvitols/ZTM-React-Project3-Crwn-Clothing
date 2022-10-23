import USER_ACTION_TYPES from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

export const userReducer = (state = INITIAL_STATE, action = {}) => {
  console.log("dispatched");
  console.log("userReducer action", action);
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      // Actions are passed to every single reducer in the app.
      // If this paraticular reducer is not affected, just return the original state.
      return state;
  }
};
