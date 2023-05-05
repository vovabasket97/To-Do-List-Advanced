import { v4 as uuid } from 'uuid';

import { IProject, ITag } from 'shared/types/projects/projects.types';

interface IItem {
  name: string;
  description: string;
  status: string;
  tags: ITag[];
}

export const generateItem = ({ name, description, status, tags }: IItem): IProject => ({
  value: uuid(),
  name,
  description,
  status,
  tags
});
