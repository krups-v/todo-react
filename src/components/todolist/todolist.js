import React from 'react';
import TDL from '../tdl-item';
import './todolist.css';
const TodoList = ({todos, onDelete, onToggleImp, onToggleDone}) => {
    const elements = todos.map((item) => {
        const {id, ...iProps} = item;
        return(
        <li key = {id} className = 'list-group-item'>
            <TDL { ...iProps } 
            onDelete={() => onDelete(id)} 
            onToggleDone = {() => onToggleDone(id)}
            onToggleImp = {() => onToggleImp(id)}
            />
        </li>
        );

    })
    return (
        <ul className = 'list-group todo-list'>
            {elements}
        </ul>
    )
};

export default TodoList;