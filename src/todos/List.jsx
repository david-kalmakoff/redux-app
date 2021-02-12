import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// Internal Dependencies
import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from './thunks';

const List = ({ todos = [], onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {
    useEffect(() => startLoadingTodos(), []);

    const completeText = completed => {
        if (completed) return "Completed"
        else return "Complete"
    };

    const loadingMessage = <div>Loading todos...</div>;

    const content = (
        <div className="List">
            { todos.map((todo, id) => (
                <div key={id}>
                    <p>{todo.text}</p>
                    <button
                        onClick={() => { onRemovePressed(todo.id); }}>
                        Remove
                    </button>
                    <button
                        onClick={() => { onCompletedPressed(todo.id); }}>
                        { completeText(todo.isCompleted) }
                    </button>
                </div>
            )) }
        </div>
    );

    return isLoading ? loadingMessage : content;
}

// Add state to props
const mapStateTopProps = state => ({
    isLoading: state.isLoading,
    todos:state.todos,
});
// Add state change functionality
const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateTopProps, mapDispatchToProps)(List);
