import React,{Component} from 'react';
import {Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Todos from './components/Todo';
import Header from './components/layout/header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import Axios from 'axios';
class App extends Component {
  
  
 
  state = {
    todos: []
  };

  // fetch data to the rest api
  componentDidMount(){
    Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res=> this.setState({todos: res.data}))
      .catch(error=>console.log(error));   
  }
  // Toggle Complete

  markComplete = (id) => {
    this.setState({todos: this.state.todos.map(todo =>{
      if(todo.id=== id){
        todo.completed = !todo.completed
      }
      return todo
    })})
  }

  //Delete Todo

  delTodo = (id) =>{
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todos:[...this.state.todos.filter(todo=> todo.id !== id)]}));
    
  }

  addTodo = (title)=>{
    Axios.post('https://jsonplaceholder.typicode.com/todos',{
      title,
      completed: false
    }).then(res=>this.setState({todos: [...this.state.todos, res.data]}));

    
  }

  render(){
    console.log(this.state.todos)
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header/>
            <Route exact path="/" render={props=>(
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos todos={this.state.todos} markComplete={this.markComplete} 
                delTodo={this.delTodo}/>
              </React.Fragment>
            )} />

            <Route path="/about" component={About}/>
            
          </div>
          
        </div>
      </Router>
    );
  }
  
}
export default App;
