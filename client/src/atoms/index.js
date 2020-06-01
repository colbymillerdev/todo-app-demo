import { atom } from 'recoil';

const todos = atom({
  key: 'todosState',
  default: [],
});

export { todos };
