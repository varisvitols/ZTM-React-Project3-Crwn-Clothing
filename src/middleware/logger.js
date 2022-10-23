// Function generator
// const curryFunc = (a) => (b, c) => {
//     return a + b - c
// }
// const with3 = curryFunc(3);
// const with10 = curryFunc(10);
// with10(9, 2);
// with3(2, 4);
// Middleware is a reusable function

export const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("CM:type: ", action.type);
  console.log("CM:payload: ", action.payload);
  console.log("CM:currentState: ", store.getState());

  next(action);

  console.log("CM:next state: ", store.getState());
};
