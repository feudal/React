import React, {useReducer} from 'react';
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    let updatedTotalAmount;
    let updatedItems;

    switch (action.type) {
        case 'ADD_ITEM':
            updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
            const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
            const existingCartItem = state.items[existingCartItemIndex];

            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.item.amount
                };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.item);
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }

        case 'REMOVE_ITEM':
            const indexOfCartThatWillBeRemoved = state.items.findIndex(item => item.id === action.id);
            updatedItems = state.items;
            updatedTotalAmount = state.totalAmount - updatedItems[indexOfCartThatWillBeRemoved].price;

            if (state.items[indexOfCartThatWillBeRemoved].amount === 1) {
                updatedItems.splice(indexOfCartThatWillBeRemoved, 1);
            } else {
                updatedItems = state.items;
                updatedItems[indexOfCartThatWillBeRemoved].amount -= 1;
            }
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
    }
    return state;
}

const CartProvider = props => {
    const [cartState, dispatchAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchAction({type: 'ADD_ITEM', item: item});
    }
    const removeItemToCartHandler = (id) => {
        dispatchAction({type: 'REMOVE_ITEM', id: id});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
