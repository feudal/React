import {configureStore} from "@reduxjs/toolkit";
import mealsReducer from './meals';

const store = configureStore({
    reducer: mealsReducer,
});

export default store;