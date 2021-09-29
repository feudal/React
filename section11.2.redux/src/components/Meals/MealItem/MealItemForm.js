import React, {useRef, useState} from 'react';
import classes from './MealItemForm.module.css';
import Input from "../../UI/Input";
import {useDispatch, useSelector} from "react-redux";
import {mealsAction} from "../../../store/meals";

const MealItemForm = props => {
    const dispatch = useDispatch();

    const [inputIsValid, setInputIsValid] = useState(true);
    const amountInputRef = useRef();
    const meal = useSelector(state => state.menuList.find(x => x.id === props.id));

    const submitHandler = event => {
        event.preventDefault();
        const inputValueNumber = +amountInputRef.current.value.trim();

        if (inputValueNumber.length === 0 || inputValueNumber < 1 || inputValueNumber > 5) {
            setInputIsValid(false);
        } else {
            setInputIsValid(true);
        }
    }

    const addToCart = ({meal, input: inputAmount}) => {
        if (inputAmount.length === 0 || inputAmount < 1 || inputAmount > 5) {
            return;
        }
        if (inputIsValid) {
            dispatch(mealsAction.add({meal, input: inputAmount}));
        }
    };

    return (
        <form
            onSubmit={submitHandler}
            className={classes.form}>
            <Input
                ref={amountInputRef}
                label='Amount'
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: 1,
                    max: 5,
                    step: 1,
                    defaultValue: 1,
                }}
            />
            <button onClick={() => addToCart({meal , input: amountInputRef.current.value})}>+ Add</button>
            {!inputIsValid && <p>Please enter a valid amount!</p>}
        </form>
    );
};

export default MealItemForm;
