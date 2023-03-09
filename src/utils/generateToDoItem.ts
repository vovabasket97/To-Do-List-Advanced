import { v4 as uuid } from 'uuid';
import { IToDo, IToDoData } from '../shared/types/todo.types';

export const generateToDoItem = ({ name, description, status }: IToDoData): IToDo => ({
  value: uuid(),
  name,
  description,
  status
});
