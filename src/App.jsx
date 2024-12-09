import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts"
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo)=>{
    console.log("todo from add todo:", todo);
    setTodos((prev)=>[ {id:Date.now(), ...todo}, ...prev] );
  }

  const updateTodo = (id, todo)=>{
    setTodos((prev)=>
      prev.map((tdo)=>tdo.id === id ? todo : tdo)
    )
  }

  const deleteTodo = (id)=>{
    setTodos((prev)=>
      prev.filter((todo)=> todo.id !== id)
    )
  }

  const toggleCompleted = (id)=>{
    setTodos((prev)=>
      prev.map((todo)=>
        todo.id === id ? {...todo, completed:!todo.completed} : todo)
    )
  }

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length > 0){
      setTodos(todos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleCompleted}}>
      <div className="mx-auto w-3/4 max-w-3xl mt-6 bg-slate-300 p-4 rounded-md">
        <TodoForm/>
        {todos.map((todo)=>(
          <TodoItem key={todo.id} todo={todo}/>
        ))}
      </div>
    </TodoProvider>
  )
}

export default App
