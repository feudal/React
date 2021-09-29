import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {addNewTodo, fetchTodos} from './store/todoSlice';
import NewTodoForm from './components/NewTodoForm';
import TodoList from './components/TodoList';

import './App.css';


function App() {
    const [text, setText] = useState('');
    const {status, error} = useSelector(state => state.todos)
    const dispatch = useDispatch();

    const handleAction = () => {
        if (text.trim().length) {
            dispatch(addNewTodo(text));
            setText('');
        }
    }

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch])

    return (
        <div className='App'>
            <NewTodoForm
                value={text}
                updateText={setText}
                handleAction={handleAction}
            />
            {status === 'Loading' && <p>Loading...</p>}
            {status === 'Rejected' && <p>An error occurred: {error}</p>}
            <TodoList/>
        </div>
    );
}

export default App;
