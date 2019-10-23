import React, {Component} from 'react';
import './tdl-item.css'

export default class TDL extends Component {
    state = {
      done: false,
      important: false
    };
      
  render() {
    const {label, onDelete, onToggleImp, onToggleDone, done, important} = this.props
    // const {done, important} = this.state;

    let classNames = 'todo-list-item';
    if (done) {
      classNames += ' done';
    }
    if (important) {
      classNames += ' important';
    }


    return (
        <span className={classNames}>
          <span
            className="todo-list-item-label"
            onClick ={onToggleDone}>
            {label}
          </span>
    
          <button type="button"
                  className="btn btn-outline-success btn-sm float-right"
                  onClick = {onToggleImp}>
            <i className="fa fa-exclamation" />
          </button>
    
          <button type="button"
                  className="btn btn-outline-danger btn-sm float-right"
                  onClick = {onDelete}>
            <i className="fa fa-trash-o" />
          </button>
        </span>
      ); 
}}