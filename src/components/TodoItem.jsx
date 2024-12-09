/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTodo } from "../contexts";

function TodoItem({todo}) {
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const {updateTodo, deleteTodo, toggleCompleted} = useTodo();
    const [isEditable, setIsEditable] = useState(false);

    const editTodo = ()=>{
        updateTodo(todo.id, {...todo, todo:todoMsg});
        setIsEditable(false)
    }

    return ( 
        <div 
        className={`my-2 flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm
         shadow-white/50 duration-300 text-black ${todo.completed ? "bg-[#c6e9a7]":"bg-[#ccbed7]"}`}>
            <input type="checkbox" checked={todo.completed} onChange={()=>{toggleCompleted(todo.id)}}/>
            <input 
            className={`border outline-none w-full bg-transparent rounded-lg 
                ${isEditable ? "border-black/10 px-2":"border-transparent"}`}
            type="text"  
            value={todoMsg} 
            readOnly={!isEditable}
            onChange={(e)=>{setTodoMsg(e.target.value)}} 
            />
            <button
            className="inline-flex w-16 h-8 rounded-lg text-sm border border-black/10 justify-center
            items-center bg-gray-50 hove:bg-gray-100 shrink-0"
            onClick={()=>{
                if(todo.completed) return
                if(isEditable){
                    editTodo()
                }else setIsEditable((prev)=>!prev)
            }}
            disabled={todo.completed}
            >{isEditable ? "Save" : "Edit"}</button>
            <button 
            className="inline-flex w-16 h-8 rounded-lg text-sm border border-black/10 justify-center
            items-center bg-gray-50 hove:bg-gray-100 shrink-0"
            onClick={()=>{deleteTodo(todo.id)}}>Delete</button>
        </div>
     );
}

export default TodoItem;