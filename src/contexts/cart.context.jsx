import { createContext, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id);

    if(existingCartItem.quantity == 1) {
        return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
    }

    return cartItems.map((cartItem) => cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
}

const clearCartItem = (cartItems, productToRemove) => 
    cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_OPEN_STATUS: 'SET_CART_OPEN_STATUS'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_CART_OPEN_STATUS:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}

export const CartProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(cartReducer, INITIAL_STATE);
    const { isCartOpen, cartItems, cartCount, cartTotal } = state;

    const updateCart = (cartItems) => {
        const newCartCount = cartItems.reduce((totalQuantity, cartItem) => totalQuantity + cartItem.quantity, 0);
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        const payload = {
            cartItems: cartItems,
            cartCount: newCartCount,
            cartTotal: newCartTotal
        };
        dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload })
    }

    const addItemToCart = (productToAdd) => {
        updateCart(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        updateCart(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToRemove) => {
        updateCart(clearCartItem(cartItems, cartItemToRemove));
    }

    const setIsCartOpen = (bool) => {
        dispatch({ type: CART_ACTION_TYPES.SET_CART_OPEN_STATUS, payload: bool })
    }

    const value = {
        isCartOpen,
        // setIsCartOpen: () => {},
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartCount,
        cartTotal,
        removeItemFromCart,
        clearItemFromCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}