import classes from './Counter.module.css';
import {counterAction} from '../store/counter';
import {useSelector, useDispatch} from "react-redux";

const Counter = () => {
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter.counter);
    const showCounter = useSelector(state => state.counter.showCounter);
    const incrementHandler = () => {
        dispatch(counterAction.increment());
    }

    const decrementHandler = () => {
        dispatch(counterAction.decrement());
    }

    const increaseHandler = () => {
        dispatch(counterAction.increase(5));
    };

    const toggleCounterHandler = () => {
        dispatch(counterAction.toggleCounter());
    };

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            {showCounter && <div className={classes.value}>{counter}</div>}
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
