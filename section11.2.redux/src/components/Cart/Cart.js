import React from 'react';
import classes from './Cart.module.css'
import Modal from "../UI/Modal";
import {useDispatch, useSelector} from "react-redux";
import {mealsAction} from "../../store/meals";
import CartItem from "./CartItem";

const Cart = () => {
    const dispatch = useDispatch();
    const orderedList = useSelector(state => state.orderedList);
    const totalAmount = useSelector(state => state.totalAmount);
    const cartItems = orderedList.map(meal => {
        return (
            <CartItem
                id={meal.id}
                key={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
                quantity={meal.quantity}
            />
        )
    })

    const closeCartHandler = () => {
        dispatch(mealsAction.closeCart());
    }

    return (
        <>
            <Modal onClickClose={closeCartHandler}>
                {cartItems}
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>{totalAmount}</span>
                </div>
                <div className={classes.actions}>
                    <button
                        onClick={closeCartHandler}
                        className={classes['button--alt']}>Close
                    </button>
                    <button
                        onClick={() => dispatch(mealsAction.order())}
                        className={classes.button}
                    >Order
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default Cart;
