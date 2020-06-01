import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { fetchTodos } from '../api/';
import { todos } from '../atoms';

const setTodoState = useSetRecoilState(todos);

const getTodos = selector({
  key: 'todos',
  get: async () => {
    const todos = await fetchTodos();
    setTodoState(todos.data);
    return todos.data;
  },
});

export { getTodos };
