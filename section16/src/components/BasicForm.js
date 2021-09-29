import useInput from "../hooks/use-input";

const BasicForm = (props) => {
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
        if(!formIsValid) {
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
    if(firstNameIsValid && lastNameIsValid && emailIsValid) {
        formIsValid = true;
    }

    const firstNameClass = firstNameInputHasError ? 'form-control invalid' : 'form-control';
    const lastNameClass = lastNameInputHasError ? 'form-control invalid' : 'form-control';
    const emailClass = emailInputHasError ? 'form-control invalid' : 'form-control';

    return (
        <form onSubmit={submitHandler}>
            <div className='control-group'>
                <div className={firstNameClass}>
                    <label htmlFor='name'>First Name</label>
                    <input
                        value={firstName}
                        onBlur={firstNameInputBlurHandler}
                        onChange={firstNameInputChangeHandler}
                        type='text'
                        id='name'/>
                    {firstNameInputHasError && <p className='error-text'>Name must have minimum 3 letters!</p>}
                </div>
                <div className={lastNameClass}>
                    <label htmlFor='name'>Last Name</label>
                    <input
                        value={lastName}
                        onBlur={lastNameInputBlurHandler}
                        onChange={lastNameInputChangeHandler}
                        type='text'
                        id='name'/>
                    {lastNameInputHasError && <p className='error-text'>Name must have minimum 3 letters!</p>}
                </div>
            </div>
            <div className={emailClass}>
                <label htmlFor='name'>E-Mail Address</label>
                <input
                    value={emailInput}
                    onChange={emailInputChangeHandler}
                    onBlur={emailInputBlurHandler}
                    type='email'
                    id='name'/>
            </div>
            {emailInputHasError && <p className='error-text'>Invalid format of email!</p>}
            <div className='form-actions'>
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>
    );
};

export default BasicForm;
