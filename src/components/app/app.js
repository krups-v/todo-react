import React, {Component} from 'react';

import AppHeader from '../appheader';
import SearchPanel from '../search';
import TodoList from '..//todolist';
import ItemStatusFilter from '../item-status-filter';
import Additem from '../additem';
import './app.css';

export default class App extends Component {
    maxId = 100;
    state = {
        todoData: [
            // {label: 'drink coffee', important: false, id: 1},
            // {label: 'make awesome app', important: true, id: 2},
            // {label: 'have a break', important: false, id: 3}
            this.createItem('Drink coffee'),
            this.createItem('go walk'),
            this.createItem('have a break')
        ],
        term: '',
        filter: 'all'
    };

    createItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }
    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            // todoData.splice(idx, 1);
            const before = todoData.slice(0, idx);
            const after = todoData.slice(idx + 1);
            const newArray = [...before, ...after];
            return {
                todoData: newArray
            }
        })
    }
    
    additem = (text) => {
        // const newItem = {
        //     label: text,
        //     important: false,
        //     id: this.maxId++
        // }
        const newItem = this.createItem(text);
        this.setState(({todoData}) => {
            const newArray = [...todoData.slice(), newItem];
            return {
                todoData: newArray
            }
        })
    }
    toggleProp = (arr, id, propName) => {
        const idx = arr.findIndex((el) => el.id === id);
            const oldItem = arr[idx];
            const newItem = {...oldItem, [propName]: !oldItem[propName]};
            
            return [
                ...arr.slice(0, idx),
                newItem,
                ...arr.slice(idx + 1)
            ];
                
    }

    onToggleImp = (id) => {
        this.setState(({todoData}) => {
            
            return {
                todoData: this.toggleProp(todoData, id, 'important')
            }
        })
    }
    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProp(todoData, id, 'done')
            }
        })
    }
    onSearchChange = (term) => {
        this.setState({term});
    }
    search(items, term) {
        if (term.length === 0) {
                return items;
            }
        return items.filter ((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;

        })
    }
    filter(items, filter) {
        switch(filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done': 
            return items.filter((item) => item.done); 
            default:
                return items;
        }
    }
    onFilter = (filter) => {
        this.setState({filter});
    }
    render() {
        const {todoData, term, filter} = this.state;
        const visible = this.filter(this.search(todoData, term),filter); 
        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - todoData.filter((el) => el.done).length;
        // const impCount = this.state.todoData.filter((el) => el.important).length;

    return (
           <div className="todo-app">
            <AppHeader toDo = {todoCount} done = {doneCount}/>
            <div className="top-panel d-flex">
               <SearchPanel onSearchChange = {this.onSearchChange}/> 
               <ItemStatusFilter filter = {filter} onFilter = {this.onFilter}/>
            </div>
            <TodoList todos = {visible} 
            onDelete = {this.deleteItem} 
            onToggleImp = {this.onToggleImp}
            onToggleDone = {this.onToggleDone}/>
            <Additem onAdd = {this.additem}/>
        </div> 
        );
        
    };
}