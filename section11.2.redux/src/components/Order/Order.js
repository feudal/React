import useInput from '../../hooks/use-input';
import Modal from "../UI/Modal";
import {useDispatch} from "react-redux";
import {mealsAction} from "../../store/meals";
import classes from './Order.module.css';
import classNames from "classnames/bind";

let classNameBound = classNames.bind(classes);

const Order = (props) => {
    const dispatch = useDispatch();

    const validateName = name => {
        return name.trim() !== '' && name.length > 2;
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const {
        value: firstName,
        hasError: firstNameInputHasError,
        valueIsValid: firstNameIsValid,
        valueChangeHandler: firstNameInputChangeHandler,
        valueInputBlurHandler: firstNameInputBlurHandler,
        reset: resetFirstNameInput
    } = useInput(validateName);

    const {
        value: lastName,
        hasError: lastNameInputHasError,
        valueIsValid: lastNameIsValid,
        valueChangeHandler: lastNameInputChangeHandler,
        valueInputBlurHandler: lastNameInputBlurHandler,
        reset: resetLastNameInput
    } = useInput(validateName);

    const {
        value: emailInput,
        hasError: emailInputHasError,
        valueIsValid: emailIsValid,
        valueChangeHandler: emailInputChangeHandler,
        valueInputBlurHandler: emailInputBlurHandler,
        reset: resetEmailInput
    } = useInput(validateEmail);

    const submitHandler = event => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        console.log(firstName);
        console.log(lastName);
        console.log(emailInput);
        resetFirstNameInput();
        resetLastNameInput();
        resetEmailInput();
    }
    let formIsValid = false;
    if (firstNameIsValid && lastNameIsValid && emailIsValid) {
        formIsValid = true;
    }

    const firstNameClass = `${classes["form-control"]} ${firstNameInputHasError ?  classes.invalid : ''}`;

    // const firstNameClass = classNameBound(classes["form-control"], {invalid: firstNameInputHasError});
    const lastNameClass = classNameBound(classes["form-control"], {invalid: lastNameInputHasError});
    const emailClass = classNameBound(classes["form-control"], {invalid: emailInputHasError});

    // const firstNameClass = firstNameInputHasError ? 'form-control invalid' : 'form-control';
    // const lastNameClass = lastNameInputHasError ? 'form-control invalid' : 'form-control';
    // const emailClass = emailInputHasError ? 'form-control invalid' : 'form-control';

    return (
        <Modal onClickClose={() => dispatch(mealsAction.toggleForm())}>
            <form onSubmit={submitHandler}>
                <h2>Ordering form</h2>
                <div className={classes['control-group']}>
                    <div className={firstNameClass}>
                        <label htmlFor='name' className={classes.label}>First Name</label>
                        <input
                            className={classes.input}
                            value={firstName}
                            onBlur={firstNameInputBlurHandler}
                            onChange={firstNameInputChangeHandler}
                            type='text'
                            id='name'/>
                        {firstNameInputHasError && <p className={classes['error-text']}>Name must have minimum 3 letters!</p>}
                    </div>
                    <div className={lastNameClass}>
                        <label htmlFor='name' className={classes.label}>Last Name</label>
                        <input
                            className={classes.input}
                            value={lastName}
                            onBlur={lastNameInputBlurHandler}
                            onChange={lastNameInputChangeHandler}
                            type='text'
                            id='name'/>
                        {lastNameInputHasError && <p className={classes['error-text']}>Name must have minimum 3 letters!</p>}
                    </div>
                </div>
                <div className={emailClass}>
                    <label htmlFor='name' className={classes.label}>E-Mail Address</label><br/>
                    <input
                        className={classes.input}
                        value={emailInput}
                        onChange={emailInputChangeHandler}
                        onBlur={emailInputBlurHandler}
                        type='email'
                        id='name'/>
                    {emailInputHasError && <p className={classes['error-text']}>Invalid format of email!</p>}
                </div>
                <div className={classes['form-actions']}>
                    <button
                        className={classes.button}
                        onClick={() => dispatch(mealsAction.toggleForm())}>Close
                    </button>
                    <button
                        className={classes.button}
                        disabled={!formIsValid}>Confirm
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default Order;
