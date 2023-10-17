
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import {Audio,Puff,Circles} from 'react-loader-spinner'
import './App.css';
import TodoApp from './components/TodoApp';

class App extends Component{

  state = {TodoList:[],NewTodo:'',TaskCompleted:false,EditItem:0,isLoading:true}

  componentDidMount(){
    this.getTodoListData()
  }

  getTodoListData = async()=>{

    const response = await fetch('https://jsonplaceholder.typicode.com/users/1/todos');
    const data = await response.json()
    this.setState({TodoList:data,isLoading:false})
  }

  OnEditTodo = (id)=>{
    const {TodoList} = this.state

    const findTodoItem = TodoList.find(eachTodo=>eachTodo.id === id)
    this.setState({NewTodo:findTodoItem.title})
    this.setState({EditItem:findTodoItem.id})
  }

  SaveData = ()=>{
    const {NewTodo,EditItem} = this.state 
    if(NewTodo === ""){
      console.log('err')
    }else{
    this.setState(prevState=>({
      TodoList:prevState.TodoList.map(eachTodo=>{
        if(eachTodo.id === EditItem){
          return {...eachTodo, title:NewTodo}
        }
        return eachTodo
      })
      
    }))
  }

    this.setState({NewTodo:''})
    
  }


  TodoItemStatus = (id)=>{
    this.setState(prevState=>({
      TodoList:prevState.TodoList.map(eachTodo=>{
        if(eachTodo.id === id){
          return {...eachTodo,completed:!eachTodo.completed}
        }
        return eachTodo
      })
    }))
  }


  OnNewTodo = (event)=>{
    this.setState({NewTodo:event.target.value})
  }



OnAddTodo = ()=>{
  const {NewTodo,TaskCompleted} = this.state 
  if(NewTodo === ""){
    console.log("error")
  }else{
    const newData = {
      userId:1,
      id:uuidv4(),
      title:NewTodo,
      completed:TaskCompleted
    }

    this.setState(prevState=>({TodoList:[...prevState.TodoList,newData],
      NewTodo:''
    }))

  }

}

OnDeleteTodo = (id)=>{
 const {TodoList} = this.state
  const filteredResults = TodoList.filter(eachTodo=>eachTodo.id !== id)
  this.setState({TodoList:filteredResults})
}

  render(){
    const {NewTodo,TodoList,isLoading} = this.state 
    console.log(TodoList)
    return(
      <div className='main-container'>
      <div className = "Todos-container">
        <h1 className = "main-heading">Todo Application</h1>
        <div className='userInput-container'>
        <input className = "Input-box" type = "text" onChange = {this.OnNewTodo} value = {NewTodo}/>

        <button className = "add-btn" type = "button" onClick = {this.OnAddTodo}>Add</button>
        <button className = "update-btn" type = "button" onClick = {this.SaveData}>Update  </button>
  
        </div>
        {isLoading ? (
          <div className = "audio-loader">
          <Puff type="TailSpin" color="#00BFFF" height={50} width={50} />
        </div>) : ( <div>
        {
            TodoList.length > 0 ? ( <ul className = "TodosList-container">
            {TodoList.map(eachTodo=>(<TodoApp TodoDetails = {eachTodo} key = {eachTodo.id} 
            TodoStatus = {this.TodoItemStatus}
            DeleteTodo = {this.OnDeleteTodo}
            EditTodo = {this.OnEditTodo}
            />))}
          </ul>) : (<div className = "No-Data-found-container"> <p>No Data Found</p></div>)

        }
        </div>
        )
      }
       
      </div>
    </div>
    )
  }
}

export default App;
