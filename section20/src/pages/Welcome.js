import React from 'react';
import {Route} from "react-router-dom";

const Welcome = () => {
    return (
        <>
            <h2>Welcome</h2>
            <Route path='/welcome/new-user'>
                <p>Welcome, new user</p>
            </Route>
        </>
    );
};

export default Welcome;
