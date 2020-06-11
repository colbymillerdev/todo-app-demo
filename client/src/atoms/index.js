import { atom, atomFamily } from 'recoil';

const todosTrigger = atom({
  key: 'todosTrigger',
  default: 0,
});

const editingState = atomFamily({
  key: 'editingState',
  default: false,
});

const uuidState = atom({
  key: 'uuidState',
  default: localStorage.getItem('todoUserId'),
});

export { todosTrigger, editingState, uuidState };
