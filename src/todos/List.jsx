import React, { useState } from 'react';
import { connect } from 'react-redux';
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

const mapStateTopProps = state => ({
    todos:state.todos,
});
const mapDispatchToProps = dispatch => ({
    onRemovePressed: text => dispatch(removeTodo(text)),
    onCompletedPressed: text => dispatch(markTodoAsCompleted(text)),
});

export default connect(mapStateTopProps, mapDispatchToProps)(List);
