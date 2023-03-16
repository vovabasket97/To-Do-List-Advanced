import { IconCheckbox, IconFolders, IconLayoutDashboard } from '@tabler/icons';

export const routes = {
  dashboard: {
    label: 'Dashboard',
    path: '/',
    icon: IconLayoutDashboard
  },
  projects: {
    label: 'Projects',
    path: '/projects',
    icon: IconFolders
  },
  todo: {
    label: 'ToDo',
    path: '/todo',
    icon: IconCheckbox
  }
};
