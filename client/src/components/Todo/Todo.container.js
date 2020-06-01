import React, { useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';

import Button from '../Buttons/Button';
import Todo from './Todo';
import { getTodos } from '../../selectors';

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);
  const [isCreateDisabled, disableCreate] = useState(false);

  const Todos = () => {
    const todos = useRecoilValueLoadable(getTodos);

    switch (todos.state) {
      case 'hasValue':
        return todos.contents.map((todo, index) => (
          <Todo key={todo.id || index} todo={todo} onSaveClick={handleSaveClick} onCancelClick={handleCancelClick} />
        ));
      case 'loading':
        return 'Loading...';
      case 'hasError':
        return 'There was an error loading todos.';
    }
  };

  const handleClick = () => {
    const newTodo = {
      message: '',
      isCompleted: false,
      isEditing: true,
    };
    disableCreate(true);
    setTodos([...todos, newTodo]);
  };

  const handleSaveClick = (todoText) => {
    console.log('Text:', todoText);
  };

  const handleCancelClick = () => {
    disableCreate(false);
    const filteredTodos = todos.filter((todo) => todo.message.trim() !== '');
    setTodos(filteredTodos);
  };

  return (
    <div className='bg-gray-300 flex items-center justify-center h-screen'>
      <div className='bg-gray-100 w-1/3 h-auto rounded overflow-hidden shadow-lg'>
        <div className='m-3'>
          <Button buttonTitle='Create Todo' onClick={handleClick} isCreateDisabled={isCreateDisabled} />
          <div className='mt-4 ml-4'>
            <Todos />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
