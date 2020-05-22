import React, { useEffect, useState } from 'react';

import { fetchTodos } from '../../api';
import Button from '../Buttons/Button';
import Todo from './Todo';

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);
  const [isCreateDisabled, disableCreate] = useState(false);

  const fetchData = async () => {
    const results = await fetchTodos();
    setTodos(results.data);
  };

  useEffect(() => {
    console.log('in');
    fetchData();
  }, []);

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
            {todos.map((todo, index) => (
              <Todo
                key={todo.id || index}
                todo={todo}
                onSaveClick={handleSaveClick}
                onCancelClick={handleCancelClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
