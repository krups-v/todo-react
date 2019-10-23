import React, {Component} from 'react';
import './additem.css'

export default class Additem extends Component {
    state = {
        label: ''
    }
    onChange = (e) => {
        this.setState({
            label: e.target.value
        });
        
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdd(this.state.label);
        this.setState({label: ''});
    }
    render() {
        // const {onAdd} = this.props;
        return (
            <form className='item-add-form d-flex'
            onSubmit = {this.onSubmit}>
                <input type = 'text' 
                className = 'form-control' 
                onChange = {this.onChange}
                placeholder = 'add new task'
                value = {this.state.label}/>
                <button className='btn btn-outline-secondary'>Add</button>
            </form>
        )
        
    }
}