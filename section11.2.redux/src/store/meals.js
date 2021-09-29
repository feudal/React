import {createSlice} from "@reduxjs/toolkit";

const menuList = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
        quantity: 0
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
        quantity: 0
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
        quantity: 0
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
        quantity: 0
    }
];


let initialStateMeals = {
    menuList,
    orderedList: [],
    numberOfOrderedMeals: 0,
    showCart: false,
    totalAmount: 0,
    isOrdering: false
}

// const fetchMeals = async () => {
//     const response = await fetch('https://food-app-3bc75-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
//     const responseData = await response.json();
//     initialStateMeals.menuList = responseData;
//     console.log(responseData);
// }
//
// fetchMeals();

const counterSlice = createSlice({
    name: 'meals',
    initialState: initialStateMeals,
    reducers: {
        initiateMenu(state, action) {
            console.log('initiate');
        },
        add(state, action) {
            state.numberOfOrderedMeals += +action.payload.input;
            let totalAmountTemp = +state.totalAmount + action.payload.meal.price * action.payload.input;
            state.totalAmount = +totalAmountTemp.toFixed(2);

            let mealIsInList = state.orderedList.filter(meal => meal.id === action.payload.meal.id).length > 0;

            if (!mealIsInList) {//TypeError: Cannot assign to read only property 'quantity' of object '#<Object>'
                state.orderedList.push({
                    ...action.payload.meal,
                    quantity: 1,
                })
            } else {
                state.orderedList.filter(meal => meal.id === action.payload.meal.id)[0].quantity += 1;
            }
        },
        remove(state, action) {
            state.totalAmount = (state.totalAmount - action.payload.meal.price).toFixed(2);
            state.numberOfOrderedMeals -= +action.payload.input;

            const quantityOfMeal = state.orderedList.filter(meal => meal.id === action.payload.meal.id)[0].quantity;
            if (quantityOfMeal === 1) {
                state.orderedList = state.orderedList.filter(meal => meal.id !== action.payload.meal.id);
            } else {
                state.orderedList.filter(meal => meal.id === action.payload.meal.id)[0].quantity -= 1;
            }
        },
        closeCart(state) {
            state.showCart = false;
        },
        showCart(state) {
            state.showCart = true;
        },
        order(state) {
            console.log('order');
            if (state.orderedList.length === 0) {
                return;
            }
            state.isOrdering = true;
            state.showCart = false;
        },
        toggleForm(state) {
            state.isOrdering = !state.isOrdering;
        },
    }
});

export default counterSlice.reducer;
export const mealsAction = counterSlice.actions;

























