import React, {useState} from 'react';
import './UserForm.css'
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";

const UserForm = props => {
    let [userName, setUserName] = useState('');
    let [userAge, setUserAge] = useState('');
    const [error, setError] = useState();

    const putUserName = (e) => {
        setUserName(e.target.value.trim());
    }
    const putUserAge = (e) => {
        setUserAge(e.target.value.trim());
    }

    function addUser(e) {
        e.preventDefault();
        if (userName.trim().length === 0 || userAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            })
            return;
        }
        if (+userAge < 1 || +userAge > 150) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (> 0).'
            })
            return;
        }
        props.onAddUser(userName, userAge);
        setUserName('');
        setUserAge('');
    }
    const closeModal = () => {
        setError(undefined);
    }

    return (
        <div>
            {error && <ErrorModal
                title={error.title}
                message={error.message}
                error={error}
                closeModal={closeModal}
            />}
            <Card>
                <form className='user-form'>
                    <div>
                        <label className='user-form__label'>Username</label>
                        <input
                            onChange={putUserName}
                            type="text"
                            value={userName}
                            className='user-form__input' placeholder='Enter the name'/>
                    </div>
                    <div>
                        <label className='user-form__label'>Age (Year)</label>
                        <input
                            onChange={putUserAge}
                            type="number"
                            min='0'
                            max='150'
                            value={userAge}
                            className='user-form__input' placeholder='Enter the age'/>
                    </div>
                    <button
                        onClick={addUser}
                        type='submit'
                        className='user-form__button'>Add User
                    </button>
                </form>
            </Card>
        </div>
    );
};

export default UserForm;
