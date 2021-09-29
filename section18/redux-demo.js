const redux = require('redux');

const reducerStore = (state = {counter: 0}, action) => {
    if (action.type === 'INCREMENT') {
        return {counter: state.counter + 1}
    }
    if (action.type === 'DECREMENT') {
        return {counter: state.counter - 1}
    }

    return state;
}

const store = redux.createStore(reducerStore);

console.log(store.getState());

const counterSubscriber = () => {
    store.getState();
}
store.subscribe(counterSubscriber);

store.dispatch({type: 'INCREMENT'});
store.dispatch({type: 'INCREMENT'});
store.dispatch({type: 'INCREMENT'});

console.log(store.getState());