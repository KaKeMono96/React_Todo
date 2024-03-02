import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm.js';
import TodoList from './components/TodoList.js';
import CheckAllandRemaining from './components/CheckAllandRemaining.js';
import TodoFilters from './components/TodoFilters.js';
import ClearCompletedBtn from './components/ClearCompletedBtn.js';
import { useEffect, useState } from 'react';


function App() {

  let [todos, setTodos ] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/todos')
    .then(res => res.json())
    .then((todos) => {
      setTodos(todos)
    })
  },[])

  let addTodo = (todo) => {
    fetch('http://localhost:3001/todos',{
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(todo)
    })
    setTodos(preveState => [...preveState,todo])
  }

  let deleteTodo = (todoId) => {
    fetch(` http://localhost:3001/todos/${todoId} `,{
      method : "DELETE"
    })
    setTodos(preveState => {
      return preveState.filter(todo => {
        return todo.id !== todoId
      }); //[todo, todo]
    })
  }

  let updateTodo = (todo) => {
    //server
    fetch(` http://localhost:3001/todos/${todo.id} `,{
      method : "PATCH",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(todo)
    })
    //client
    setTodos(preveState => {
      return preveState.map(t => {
        if(t.id == todo.id){
          return todo
        }
        return t;

      }); //[todo, todo]
    })



  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo = {addTodo}/>  
        <TodoList todos= {todos} deleteTodo ={deleteTodo} updateTodo= {updateTodo}/>
        <CheckAllandRemaining/>
        <div className="other-buttons-container">
        <TodoFilters/> 
        <ClearCompletedBtn/>
        </div>
      </div>
    </div>
  );
}

export default App;
