import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

const TodoList = () => {
    const todos = useSelector(state => state.todos.todos);
    const todosList = todos.map((todo) => (
        <TodoItem
            key={todo.id}
            {...todo}
        />
    ))

  return (
    <ul>
      {todosList}
    </ul>
  );
};

export default TodoList;
