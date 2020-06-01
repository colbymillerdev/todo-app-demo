import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { fetchTodos } from '../api/';
import { todos } from '../atoms';

const getTodos = selector({
  key: 'todos',
  get: async () => {
    const todos = await fetchTodos();
    return todos.data;
  },
});

export { getTodos };
