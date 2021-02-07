import React, { useState } from 'react';
import { connect } from 'react-redux';
// Internal Dependencies
import { removeTodo, markTodoAsCompleted } from './actions';

const List = ({ todos = [], onRemovePressed, onCompletedPressed }) => {
    const completeText = completed => {
        if (completed) return "Completed"
        else return "Complete"
    }

    return (
        <div className="List">
            {todos.map(todo => (
                <div>
                    <p>{todo.text}</p>
                    <button
                        onClick={() => { onRemovePressed(todo.text); }}>
                        Remove
                    </button>
                    <button
                        onClick={() => { onCompletedPressed(todo.text); }}>
                        { completeText(todo.isCompleted) }
                    </button>
                </div>
            ))}
        </div>
    );
}

// Add state to props
const mapStateTopProps = state => ({
    todos:state.todos,
});
// Add state change functionality
const mapDispatchToProps = dispatch => ({
    onRemovePressed: text => dispatch(removeTodo(text)),
    onCompletedPressed: text => dispatch(markTodoAsCompleted(text)),
});

export default connect(mapStateTopProps, mapDispatchToProps)(List);
