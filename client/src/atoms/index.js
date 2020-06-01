import { atom } from 'recoil';

const todosTrigger = atom({
  key: 'todosTrigger',
  default: 0,
});

export { todosTrigger };
