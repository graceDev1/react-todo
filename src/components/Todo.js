import React, {Component} from 'react';

class Todos extends Component{
    render(){
        return this.props.todos.map((todos)=>{
        <h3> {todos.title }</h3>
        
        })
    }
}

export default Todos;
