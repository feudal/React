import React, {useEffect, useState} from 'react';
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css'
import {useDispatch, useSelector} from "react-redux";
import {mealsAction} from "../../store/meals";

const HeaderCardButton = () => {
    const [btnIsHightlighted, setBtnIsHightlighted] = useState(false);
    const dispatch = useDispatch();

    const showCartHandler = () => {
        dispatch(mealsAction.showCart());
    }

    const numberOfOrderedMeals = useSelector(state => state.numberOfOrderedMeals);

    useEffect(() => {
        if (numberOfOrderedMeals === 0) {
            return;
        }
        setBtnIsHightlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHightlighted(false);
        }, 300);

        return () => { clearTimeout(timer)};
    }, [numberOfOrderedMeals]);

    const btnClasses = `${classes.button} ${btnIsHightlighted ? classes.bump : ''}`;
    return (
        <button
            onClick={showCartHandler}
            type='button'
            className={btnClasses}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfOrderedMeals}</span>
        </button>
    );
};

export default HeaderCardButton;


