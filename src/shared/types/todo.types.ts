export interface ITag {
  value: string;
}

export interface IToDoData {
  name: string;
  description: string;
  status: string;
  tags: ITag[];
}
export interface IToDo extends IToDoData {
  value: string;
}
