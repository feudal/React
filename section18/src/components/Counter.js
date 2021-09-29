import classes from './Counter.module.css';
import {useSelector, useDispatch, connect} from "react-redux";
import {DECREMENT, INCREASE, INCREMENT, RESET} from "../store/store";

const Counter = () => {
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter);
    const incrementHandler = () => {
        dispatch({type: INCREMENT});
    }

    const decrementHandler = () => {
        dispatch({type: DECREMENT});
    }

    const increaseHandler = () => {
        dispatch({type: INCREASE, amount: 5});
    };

    const toggleCounterHandler = () => {
        dispatch({type: RESET});
    };

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            <div className={classes.value}>{counter}</div>
            <div>
                <button onClick={incrementHandler}>Increment</button>
                <button onClick={increaseHandler}>Increment by 5</button>
                <button onClick={decrementHandler}>Decrement</button>
            </div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
