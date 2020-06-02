import React, { useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

import SaveCancelButtons from '../Buttons/SaveCancelButtons';
import EditDeleteButtons from '../Buttons/EditDeleteButtons';
import { editingState } from '../../atoms';
import { deleteTodo, updateTodo } from '../../api';
import { getTodos } from '../../selectors';

const Todo = ({ todo }) => {
  // Example of using Recoil atomFamily to have separate state per element.
  const [isEditing, setEditing] = useRecoilState(editingState(todo.id));

  const [editedText, setEditText] = useState(todo.message);
  const [isCompleted, setCompleted] = useState(todo.isCompleted);
  const refreshTodos = useResetRecoilState(getTodos);

  const handleEditClick = () => setEditing(true);

  const handleCancelClick = () => {
    setEditing(false);
    setEditText(todo.message);
  };

  const handleSaveClick = async () => {
    setEditing(false);

    const body = { message: editedText };

    await updateTodo(todo.id, body);
    refreshTodos();
  };

  const handleDeleteClick = async () => {
    await deleteTodo(todo.id);
    refreshTodos();
  };

  const handleCompletedClick = async () => {
    setCompleted(!isCompleted);

    const body = { isCompleted: !isCompleted };
    await updateTodo(todo.id, body);
  };

  const handleInput = (e) => setEditText(e.target.value);

  return (
    <div className='mt-2 flex items-center'>
      <input
        type='checkbox'
        className='mr-2'
        disabled={isEditing}
        onChange={handleCompletedClick}
        checked={isCompleted}
      />
      {!isEditing ? (
        <span className='py-2'>{isCompleted ? <strike>{todo.message}</strike> : todo.message}</span>
      ) : (
        <input
          className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-3/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
          type='text'
          value={editedText}
          onChange={handleInput}
        />
      )}

      {isEditing ? (
        <SaveCancelButtons todoText={todo.message} onSaveClick={handleSaveClick} onCancelClick={handleCancelClick} />
      ) : (
        <EditDeleteButtons onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
      )}
    </div>
  );
};

export default Todo;
