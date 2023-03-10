import { IInitial } from 'shared/types/column.types';
import { generateToDoItem } from 'utils/generateToDoItem';

export const data = [
  { value: 'backlog', title: 'Backlog' },
  { value: 'in progress', title: 'In Progress' },
  { value: 'done', title: 'Done' }
];

export const columns = {
  'column-0': {
    id: 'column-0',
    ...data[0],
    items: [
      generateToDoItem({
        name: 'Create css responsive',
        description: 'Create css responsive for all pages',
        status: 'backlog',
        tags: []
      }),
      generateToDoItem({
        name: 'Create dark/white theme',
        description: 'Create dark/white theme css with tailwind and mantine.',
        status: 'backlog',
        tags: []
      }),
      generateToDoItem({
        name: 'Create back-end on nestjs',
        description:
          'Create back-end on nestjs with mongodb for store data about tasks, users and make authentication for log in and sign in users.',
        status: 'backlog',
        tags: []
      }),
      generateToDoItem({
        name: 'Create account page',
        description: 'Create account page with some tabs. For example "general, authentication".',
        status: 'backlog',
        tags: []
      })
    ]
  },
  'column-1': {
    id: 'column-1',
    ...data[1],
    items: []
  },
  'column-2': {
    id: 'column-2',
    ...data[2],
    items: [
      generateToDoItem({
        name: 'Make notification system',
        description: 'Create notification system for comfortable managed notifications',
        status: 'done',
        tags: []
      }),
      generateToDoItem({
        name: 'Make add task functionality and layout',
        description: 'Make functionality for add task to state.',
        status: 'done',
        tags: []
      }),
      generateToDoItem({
        name: 'Make cards dynamic height',
        description: 'Make normal dnd boards with different height cards.',
        status: 'done',
        tags: []
      }),
      generateToDoItem({
        name: 'Create Drag and Drop board',
        description: 'Create dnd board with available to dnd and to creating new.',
        status: 'done',
        tags: []
      }),
      generateToDoItem({
        name: 'Make routing',
        description: 'Make good routing system architecture for routing in app.',
        status: 'done',
        tags: []
      })
    ]
  }
};

export const initial: IInitial = {
  columns,
  columnOrder: ['column-0', 'column-1', 'column-2']
};
