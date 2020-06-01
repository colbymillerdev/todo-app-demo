import { atom, atomFamily } from 'recoil';

const todosTrigger = atom({
  key: 'todosTrigger',
  default: 0,
});

const editingState = atomFamily({
  key: 'editingState',
  default: false,
});

export { todosTrigger, editingState };
