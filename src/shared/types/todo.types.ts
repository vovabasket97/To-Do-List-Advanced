export interface IToDoData {
  name: string;
  description: string;
  status: string;
}
export interface IToDo extends IToDoData {
  value: string;
}
