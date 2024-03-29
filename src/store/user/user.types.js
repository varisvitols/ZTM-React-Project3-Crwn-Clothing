// TODO: Would be better to export const, not export default, in case there was other constants in user.types.js

const USER_ACTION_TYPES = {
  CHECK_USER_SESSION: "user/CHECK_USER_SESSION",
  GOOGLE_SIGN_IN_START: "user/GOOGLE_SIGN_IN_START",
  EMAIL_SIGN_IN_START: "user/EMAIL_SIGN_IN_START",
  SIGN_IN_SUCCESS: "user/SIGN_IN_SUCCESS",
  SIGN_IN_FAILED: "user/SIGN_IN_FAILED",
};

export default USER_ACTION_TYPES;
