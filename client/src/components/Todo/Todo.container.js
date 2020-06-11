import React, { useState, useEffect } from 'react';
import { useRecoilValueLoadable, useResetRecoilState, useRecoilState } from 'recoil';
import { AiOutlineLink } from 'react-icons/ai';

import Button from '../Buttons/Button';
import Todo from './Todo';
import { uuidState } from '../../atoms';
import { getTodos } from '../../selectors';
import { createTodo, createUser } from '../../api';

const LOCAL_STORAGE_KEY = 'todoUserId';

const TodoContainer = ({ match }) => {
  const [todoText, setTodoText] = useState('');
  const [currentUuid, setUuid] = useRecoilState(uuidState);
  const refreshTodos = useResetRecoilState(getTodos);

  const determineUser = async () => {
    // Check for shared url with existing uuid.
    if (match.params.uuid) return setUuid(match.params.uuid);

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
    <div className='bg-gray-300 flex flex-col items-center justify-center h-screen'>
      <div className='relative mb-4 w-2/6 max-w-3xl'>
        <div className='absolute flex border border-transparent left-0 top-0 h-full w-10'>
          <div className='flex items-center justify-center rounded z-10 bg-gray-100 text-gray-600 text-lg h-full w-full'>
            <AiOutlineLink />
          </div>
        </div>
        <input
          className='bg-gray-200 text-gray-700 relative w-full border rounded py-2 pr-2 pl-12 leading-tight shadow'
          type='text'
          value={
            process.env.NODE_ENV === 'production'
              ? `https://todo-app-demo-ui.herokuapp.com/${currentUuid}`
              : `https://localhost:3000/${currentUuid}`
          }
          disabled
        />
      </div>

      <div className='bg-gray-100 py-4  w-2/3 max-w-3xl h-auto rounded overflow-hidden shadow-lg'>
        <div className='m-3'>
          <div className='flex justify-between ml-4'>
            <input
              className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-3/4 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 shadow'
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
