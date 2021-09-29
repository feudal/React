import classes from './ProfileForm.module.css';
import {useContext, useRef} from "react";
import AuthContext from "../../store/auth-context";
import {useHistory} from 'react-router-dom';

const ProfileForm = () => {
    const passwordInputRef = useRef();
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredNewPassword = passwordInputRef.current.value;
        const API_KEY = 'AIzaSyAb00BknyYAFZ9_dz_idnW4mqPLdpPxdns';
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY]' + API_KEY,
            {
                method: 'POST',
                body: JSON.stringify({
                    idToken: authCtx.token,
                    password: enteredNewPassword,
                    returnSecuredToken: false,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'abc'
                }
            }).then(res => {
            // assumption: always succeeds
            history.replace('/');
        })
    }

    return (
        <form
            onSubmit={submitHandler}
            className={classes.form}>
            <div className={classes.control}>
                <label htmlFor='new-password'>New Password</label>
                <input
                    minLength='7'
                    ref={passwordInputRef}
                    type='password'
                    id='new-password'/>
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
}

export default ProfileForm;
