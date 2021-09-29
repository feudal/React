import React, {useState} from 'react';
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import './main.css';


function App() {
    const [usersList, setUserList] = useState([]);

    const addUserHandler = (uName, uAge)=> {
        setUserList((prevUserList) => {
            return [...prevUserList, {name: uName, age: uAge, id: Math.random().toString()}]
        })
    }
  return (
    <div className='container'>
      <UserForm onAddUser={addUserHandler}/>
      <UserList users={usersList} />
    </div>
  );
}

export default App;
