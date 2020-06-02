import React, { useState } from 'react';
import { useRecoilValueLoadable, useResetRecoilState } from 'recoil';

import Button from '../Buttons/Button';
import Todo from './Todo';
import { getTodos } from '../../selectors';
import { createTodo } from '../../api';

const TodoContainer = () => {
  const [todoText, setTodoText] = useState('');
  const refreshTodos = useResetRecoilState(getTodos);

  // Component that returns fetched todos from Recoil state.
  const Todos = () => {
    const todos = useRecoilValueLoadable(getTodos);

    switch (todos.state) {
      case 'hasValue':
        return todos.contents.map((todo, index) => <Todo key={todo.id || index} todo={todo} />);
      case 'loading':
        return 'Loading...';
      case 'hasError':
        return 'There was an error loading todos.';
    }
  };

  const handleCreateClick = async () => {
    const newTodo = { message: todoText, isCompleted: false };
    await createTodo(newTodo);
    setTodoText('');

    // Call force update that triggers Recoil selector.
    refreshTodos();
  };

  const handleInput = (e) => setTodoText(e.target.value);

  return (
    <div className='bg-gray-300 flex items-center justify-center h-screen'>
      <div className='bg-gray-100 w-1/3 h-auto rounded overflow-hidden shadow-lg'>
        <div className='m-3'>
          <div className='flex justify-evenly'>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-3/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 rounded shadow'
              type='text'
              placeholder='Enter a Todo'
              value={todoText}
              onChange={handleInput}
            />
            <Button buttonTitle='+' onClick={handleCreateClick} />
          </div>
          <div className='mt-4 ml-4'>
            <Todos />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
