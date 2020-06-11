import React, { useState, useEffect } from 'react';
import { useRecoilValueLoadable, useResetRecoilState, useRecoilState } from 'recoil';

import Button from '../Buttons/Button';
import Todo from './Todo';
import { uuidState } from '../../atoms';
import { getTodos } from '../../selectors';
import { createTodo, createUser } from '../../api';

const LOCAL_STORAGE_KEY = 'todoUserId';

const TodoContainer = () => {
  const [todoText, setTodoText] = useState('');
  const [currentUuid, setUuid] = useRecoilState(uuidState);
  const refreshTodos = useResetRecoilState(getTodos);

  const determineUser = async () => {
    if (currentUuid) return;

    const {
      data: { uuid },
    } = await createUser();

    localStorage.setItem(LOCAL_STORAGE_KEY, uuid);
    setUuid(uuid);
  };

  useEffect(() => {
    determineUser();
  }, []);

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
    const newTodo = { message: todoText, isCompleted: false, uuid: currentUuid };
    await createTodo(newTodo);
    setTodoText('');

    // Call force update that triggers Recoil selector.
    refreshTodos();
  };

  const handleInput = (e) => setTodoText(e.target.value);

  return (
    <div className='bg-gray-300 flex items-center justify-center h-screen'>
      <div className='bg-gray-100 py-4  w-2/3 max-w-3xl h-auto rounded overflow-hidden shadow-lg'>
        <div className='m-3'>
          <div className='flex justify-between ml-4'>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-3/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 rounded shadow'
              type='text'
              placeholder='Enter a Todo'
              value={todoText}
              onChange={handleInput}
            />
            <Button buttonTitle='+' onClick={handleCreateClick} disabled={todoText === ''} />
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
