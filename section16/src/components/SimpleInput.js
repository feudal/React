import {useState} from "react";
import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
    function validateName(name) {
        return name.trim() !== '' && name.length > 2;
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const {
        value: enteredName,
        hasError: nameInputHasError,
        valueChangeHandler: nameInputChangeHandler,
        valueInputBlurHandler: nameInputBlurHandler,
        reset: resetNameInput
    } = useInput(validateName);

    const {
        value: enteredEmail,
        hasError: emailInputHasError,
        valueChangeHandler: emailInputChangeHandler,
        valueInputBlurHandler: emailInputBlurHandler,
        reset: resetEmailInput
    } = useInput(validateEmail);

    let formIsValid = false;
    if (!nameInputHasError && !emailInputHasError) {
        formIsValid = true;
    }

    const formSubmissionHandler = event => {
        event.preventDefault();
        if (nameInputHasError && emailInputHasError) {
            return;
        }
        console.log(enteredName);
        console.log(enteredEmail);
        resetNameInput();
        resetEmailInput();
    }

    const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
    const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

    return (
        <form onSubmit={formSubmissionHandler}>
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                <input
                    onBlur={nameInputBlurHandler}
                    type='text'
                    id='name'
                    value={enteredName}
                    onChange={nameInputChangeHandler}/>
            </div>
            {nameInputHasError && <p className='error-text'>Name must have minimum 3 letters!</p>}

            <div className={emailInputClasses}>
                <label htmlFor='email'>Your Email</label>
                <input
                    onBlur={emailInputBlurHandler}
                    type='email'
                    id='email'
                    value={enteredEmail}
                    onChange={emailInputChangeHandler}/>
            </div>
            {emailInputHasError && <p className='error-text'>Invalid format of email!</p>}
            <div className="form-actions">
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default SimpleInput;
