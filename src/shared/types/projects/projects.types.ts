export interface ITag {
  value: string;
}

export interface IProjectData {
  name: string;
  description: string;
  status: string;
  tags: ITag[];
}
export interface IProject extends IProjectData {
  value: string;
}
