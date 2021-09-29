export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const INCREASE = 'INCREASE';
export const RESET = 'RESET';

const reducerStore = (state = {counter: 0}, action) => {
    switch (action.type) {
        case INCREMENT:
            return {counter: state.counter + 1};
        case DECREMENT:
            return {counter: state.counter - 1};
        case INCREASE:
            return {counter: state.counter + action.amount};
        case RESET:
            return {counter: 0};
    }
    return state;
}

const redux = require('redux');
const store = redux.createStore(reducerStore);

export default store;
