import React, { useState } from 'react';
import { connect } from 'react-redux';
// Internal Dependencies
import { addTodoRequest } from './thunks';

const Todo = ({ todos = [], onCreatePressed }) => {
    const [inputValue, setInputValue] = useState('');

    return (
        <div className="Todo">
            <h1>Testing</h1>
            <input 
                type="text" 
                value={inputValue} 
                onChange={e => setInputValue(e.target.value)} />
            <button
                onClick={() => {
                    const isDuplicateText =
                        todos.some(todo => todo.text === inputValue);
                    if (!isDuplicateText) {
                        onCreatePressed(inputValue);
                        setInputValue('');
                    }
                }}
            >
                Create Todo
            </button>
        </div>
    );
}

// Add state to props
const mapStateTopProps = state => ({
    todos:state.todos,
});
// Add state change functionality
const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(addTodoRequest(text)),
});

export default connect(mapStateTopProps, mapDispatchToProps)(Todo);
