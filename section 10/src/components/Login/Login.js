import React, {useEffect, useState, useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
    switch (action.type) {
        case 'USER_INPUT':
            console.log('input email');
            return {value: action.val, isValid: action.val.includes('@' && '.')};
        case 'VALIDATE_INPUT':
            console.log('reduce email');
            return {value: state.value, isValid: state.value.includes('@' && '.')};
    }
    return {value: state.value, isValid: false}
};

const passwordReducer = (state, action) => {//value, isValid
    if (action.type === 'PASSWORD_INPUT') {
        return {value: action.val, isValid: action.val.trim().length > 6}
    } else if (action.type === 'VALIDATE_PASSWORD') {
        return {value: state.value, isValid: state.value.trim().length > 6}
    }
}

const Login = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null});

    // useEffect(() => {
    //   const identifier = setTimeout (() => {
    //     console.log('check validity');
    //         setEmailIsValid(
    //             emailState.value.includes('@') && enteredPassword.trim().length > 6
    //         );
    //     }, 500);
    //
    //   return () => {
    //     console.log('clear');
    //     clearTimeout(identifier);
    //   };
    //
    // }, [enteredPassword, enteredEmail]);

    const emailChangeHandler = (event) => {
        console.log('dispatch email input');
        dispatchEmail({type: 'USER_INPUT', val: event.target.value});
    };
    const passwordChangeHandler = (event) => {
        dispatchPassword({type: 'PASSWORD_INPUT', val: event.target.value});

        setFormIsValid(
            emailState.isValid && passwordState.isValid
        )
    };
    const validateEmailHandler = () => {
        console.log('dispatch email validation');
        dispatchEmail({type: 'VALIDATE_INPUT'});
    };

    const validatePasswordHandler = () => {
        dispatchPassword({type: 'VALIDATE_PASSWORD'})
        // setPasswordIsValid(enteredPassword.trim().length > 6);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(emailState.value, passwordState.value);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        emailState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        passwordState.isValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
