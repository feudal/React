import classes from './CartItem.module.css';
import {useDispatch, useSelector} from "react-redux";
import {mealsAction} from "../../store/meals";

const CartItem = props => {
    const meal = useSelector(state => state.menuList.find(x => x.id === props.id));
    const dispatch = useDispatch();

    return (
        <li className={classes['cart-item']}>
            <div>
                <h2>{props.name}</h2>
                <div className={classes.summary}>
                    <span className={classes.price}>${props.price}</span>
                    <span className={classes.amount}>x {props.quantity}</span>
                </div>
            </div>
            <div className={classes.actions}>
                <button onClick={() => dispatch(mealsAction.remove({meal, input:1}))}>−</button>
                <button onClick={() => dispatch(mealsAction.add({meal, input:1}))}>+</button>
            </div>
        </li>
    );
};

export default CartItem;
