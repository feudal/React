import {useContext, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';

import classes from './AuthForm.module.css';
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const authCtx = useContext(AuthContext);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };
    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const API_KEY = 'AIzaSyAb00BknyYAFZ9_dz_idnW4mqPLdpPxdns';
        let url;
        if (isLogin) {//check account
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY;
        } else {//create account
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY;
        }

        setIsLoading(true);
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            setIsLoading(false);
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((data) => {
                    let errorMessage = 'Authentication failed!';
                    throw new Error(errorMessage);
                });
            }
        }).then((data) => {
            const expirationTime = new Date ((new Date().getTime() + (+data.expiresIn * 1000)));
            authCtx.login(data.idToken, expirationTime.toISOString());
            history.replace('/');//can't return to this page again
            console.log(data);
        }).catch((error) => {
            alert(error.message);
        });
    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input
                        ref={emailInputRef}
                        type='email'
                        id='email' required/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input
                        ref={passwordInputRef}
                        type='password'
                        id='password' required/>
                </div>
                <div className={classes.actions}>
                    {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
                    {isLoading && <p>Sending request...</p>}
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;
