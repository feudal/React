import React from 'react';
import './UserList.css';
import Card from "../UI/Card";


const UserList = (props) => {
    if (props.users.length === 0) {
        return <Card>List is empty</Card>
    }
    return (
        <Card>
            <ul className='user-list'>
                {props.users.map((user) => {
                    return <li
                        key={user.id}
                        className='user-list__item'>
                        {user.name + ' (' + user.age + ' years old)'}
                    </li>
                })}
            </ul>
        </Card>
    );
};

export default UserList;
