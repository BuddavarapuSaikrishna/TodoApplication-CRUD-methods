import {MdDelete} from 'react-icons/md'
import {FaRegEdit} from 'react-icons/fa'
import './index.css'

const TodoApp = (props)=>{

    const {TodoDetails,DeleteTodo,TodoStatus,EditTodo} = props 
    const {title,id,completed} = TodoDetails

    const DeleteTodoItem = ()=>{
        DeleteTodo(id)
    }

    const CheckTask = completed ? "active":null
    const StatusTodo = ()=>{
        TodoStatus(id)
    }

    const EditTodoItem = ()=>{
        EditTodo(id)
    }

    return(
        <li className = "list-items-container">
            <p className= {`list-items ${CheckTask}`} onClick = {StatusTodo}>{title}</p>
            <div className = "buttons-container">
                <button className = "edit-btn" type = "button" onClick = {EditTodoItem}>
                    <FaRegEdit/>
                </button>
                <button className = "delete-btn" type = "button" onClick = {DeleteTodoItem}>
                    <MdDelete/>
                </button>
            </div>
        </li>
    )

}
export default TodoApp