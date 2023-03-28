import { v4 as uuid } from 'uuid';

export const initialToDoItem = (name: string) => ({ id: uuid(), name, items: [] });

export const initial = {
  data: [initialToDoItem('Test')],
  current: 0
};
