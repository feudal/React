import React, {useContext, useEffect, useState} from 'react';
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCart.module.css'
import CartContext from "../../store/cart-context";

const HeaderCardButton = props => {
    const [btnIsHightlighted, setBtnIsHightlighted] = useState(false);
    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const { items } = cartCtx;

    const btnClasses = `${classes.button} ${btnIsHightlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHightlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHightlighted(false);
        }, 300);

        return () => { clearTimeout(timer)};
    }, [items]);


    return (
        <button
            onClick={props.onClick}
            type='button'
            className={btnClasses}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCardButton;


