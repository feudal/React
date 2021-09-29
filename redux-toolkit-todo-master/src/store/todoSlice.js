import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {retry} from "@reduxjs/toolkit/query";

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
            if (!response.ok) {
                throw new Error('Server error');
            }
            const data = await response.json();

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodos',
    async function (id, {dispatch, rejectWithValue}) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,
                {
                    method: 'DELETE',
                }
            );
            if (!response.ok) {
                throw  new Error('can\'t delete item');
            }

            dispatch(removeTodo({id}));
            const data = await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus',
    async function (id, {dispatch, rejectWithValue, getState}) {
        const todo = getState().todos.todos.find(todo => todo.id === id);

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        completed: !todo.completed,
                    })
                });

            if (!response.ok) {
                throw new Error('Can\'t toggle item');
            }
            dispatch(toggleComplete({id}));
        } catch
            (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function (text, {dispatch, rejectWithValue}) {
        const todo = {
            userId: 1,
            title: text,
            completed: false,
        }
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(todo)
                });
            const data = await response.json();
            console.log(data);
            dispatch(addTodo(todo));

            if (!response.ok) {
                throw new Error('Can\'t add new task. Server error.')
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const setError = (state, action) => {
    state.status = 'Rejected';
    state.error = action.payload;
}

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null,
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload);
        },
        toggleComplete(state, action) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
            toggledTodo.completed = !toggledTodo.completed;
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        }
    },
    extraReducers: {
        [fetchTodos.pending]: (state) => {
            state.status = 'Loading';
            state.error = null;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'Completed';
            state.todos = action.payload;
        },
        [fetchTodos.rejected]: setError,
        [deleteTodo.rejected]: setError,
        [toggleStatus.rejected]: setError,
        [addNewTodo.rejected]: setError,
    }
});

export const {addTodo, toggleComplete, removeTodo} = todoSlice.actions;

export default todoSlice.reducer;