import { createContext, useEffect, useReducer } from 'react';

import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

// as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    console.log('dispatched');
    console.log('userReducer action', action)
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null);
    const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE)
    const { currentUser } = state;
    console.log('UserProvider currentUser', currentUser)

    const setCurrentUser = (user) => {
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
    }

    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => { // ???
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
            console.log('unsubscribe', user);
        });

        return unsubscribe; // how does this work?
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}