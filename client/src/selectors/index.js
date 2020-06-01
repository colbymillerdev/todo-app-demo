import { atom, selector, useRecoilState, useRecoilValue, DefaultValue } from 'recoil';

import { fetchTodos } from '../api/';
import { todosTrigger } from '../atoms';

const getTodos = selector({
  key: 'getTodos',
  get: async ({ get }) => {
    console.log('updating');
    get(todosTrigger); // Register the selector to force update.
    const todos = await fetchTodos();
    return todos.data;
  },
  set: ({ set }, value) => {
    if (value instanceof DefaultValue) {
      set(todosTrigger, (n) => n + 1);
    }
  },
});

export { getTodos };
