import { selector, DefaultValue } from 'recoil';

import { fetchTodos } from '../api/';
import { todosTrigger, uuidState } from '../atoms';

const getTodos = selector({
  key: 'getTodos',
  get: async ({ get }) => {
    get(todosTrigger); // Register the selector to force update.
    const uuid = get(uuidState);
    const todos = await fetchTodos(uuid);
    return todos.data;
  },
  set: ({ set }, value) => {
    if (value instanceof DefaultValue) {
      set(todosTrigger, (n) => n + 1);
    }
  },
});

export { getTodos };
