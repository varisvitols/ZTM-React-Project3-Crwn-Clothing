import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

// Function generator
// const curryFunc = (a) => (b, c) => {
//     return a + b - c
// }
// const with3 = curryFunc(3);
// const with10 = curryFunc(10);
// with10(9, 2);
// with3(2, 4);
// Middleware is a reusable function

const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log('CM:type: ', action.type);
    console.log('CM:payload: ', action.payload);
    console.log('CM:currentState: ', store.getState());

    next(action);

    console.log('CM:next state: ', store.getState());
}

// Middlewares in redux are executed just before they hit the reducers.
// const middleWares = [logger];
const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
// export const store = createStore(rootReducer);