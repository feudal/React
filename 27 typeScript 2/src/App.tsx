import React from 'react';
import './App.css';
import Todos from "./components/Todos/Todos";
import Todo from "./components/models/todos";
import { Route } from 'react-router-dom';

function App() {
    const todos = [
        new Todo('Learn React'),
        new Todo('Learn swim'),
    ]
    return (
        <div className="App">
            <Todos items={todos}/>
            <Route>

            </Route>
        </div>
    );
}

export default App;
