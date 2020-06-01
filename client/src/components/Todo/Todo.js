import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import SaveCancelButtons from '../Buttons/SaveCancelButtons';
import EditButton from '../Buttons/EditButton';
import { editingState } from '../../atoms';

const Todo = ({ todo, onSaveClick, onCancelClick }) => {
  // Example of using Recoil atomFamily to have separate state per element.
  const [isEditing, setEditing] = useRecoilState(editingState(todo.id));

  const [todoText, setTodoText] = useState(todo.message);
  const [editedText, setEditText] = useState(todoText);

  const handleEditClick = () => setEditing(true);
  const handleCancelClick = () => {
    setEditing(false);
    setEditText(todoText);
    onCancelClick();
  };
  const handleSaveClick = () => {
    setEditing(false);
    setTodoText(editedText);
    onSaveClick(todoText);
  };

  const handleInput = (e) => setEditText(e.target.value);

  return (
    <div className='mt-2 flex items-center'>
      <input type='checkbox' className='mr-2' disabled={isEditing} />
      {!isEditing ? (
        <span className='py-2'>{todoText}</span>
      ) : (
        <input
          className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-3/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
          type='text'
          value={editedText}
          onChange={handleInput}
        />
      )}

      {isEditing ? (
        <SaveCancelButtons todoText={todoText} onSaveClick={handleSaveClick} onCancelClick={handleCancelClick} />
      ) : (
        <EditButton onClick={handleEditClick} />
      )}
    </div>
  );
};

export default Todo;
