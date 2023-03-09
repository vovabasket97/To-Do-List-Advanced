import { columns } from 'configs/todo/getInitialData';
import { IToDo } from './todo.types';

export interface IColumn {
  id: string;
  title: string;
  value: string;
  items: IToDo[];
}

export type TColumns = keyof typeof columns;

export interface IInitial {
  columns: {
    [key: string]: IColumn;
  };
  columnOrder: TColumns[];
}
