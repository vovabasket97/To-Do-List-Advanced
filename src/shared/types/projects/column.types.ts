import { columns } from 'configs/projects/getInitialProjects';
import { IProject } from './projects.types';

export interface IColumn {
  id: string;
  title: string;
  value: string;
  items: IProject[];
}

export type TColumns = keyof typeof columns;
export interface TProjectData {
  id: string;
  name: string;
  columns: {
    [key: string]: IColumn;
  };
  columnOrder: TColumns[];
}

export interface IInitial {
  data: TProjectData[];
  current: number;
}
