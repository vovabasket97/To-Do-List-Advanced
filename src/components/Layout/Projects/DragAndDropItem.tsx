import { Button, Menu, Text, createStyles } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconDotsVertical, IconPencil, IconTrash, IconTrashX } from '@tabler/icons';
import { FC, useCallback } from 'react';

import { useActions } from 'hooks/useActions';

import { IColumn } from 'shared/types/projects/column.types';
import { IProject } from 'shared/types/projects/projects.types';

const useStyles = createStyles(theme => ({
  item: {
    ...theme.fn.focusStyles(),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    width: '350px'
  },

  itemDragging: {
    boxShadow: theme.shadows.sm
  }
}));

interface IDashboardDragAndDropItem {
  item: IProject;
  column: IColumn;
  isDragging: boolean;
}

const DashboardDragAndDropItem: FC<IDashboardDragAndDropItem> = ({ item, column, isDragging = false }) => {
  const actions = useActions();
  const { classes, cx } = useStyles();

  const onClickEditHandle = useCallback(() => {
    actions.changeLastOpenedItemId(item.value);
    actions.changeDrawerToDoItem(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onDeleteHandle = useCallback(() => {
    const newItems = column.items.filter((el: IProject) => el.value !== item.value);
    actions.removeProjectsItem({ columnId: column.id, newItems });
    showNotification({
      title: 'Great job',
      message: 'Your task was removed successfully! 🤥',
      loading: false,
      icon: <IconTrashX size={18} />,
      color: 'teal'
    });
  }, [actions, column.id, column.items, item.value]);

  return (
    <div className={cx(classes.item, { [classes.itemDragging]: isDragging })}>
      <div className='flex flex-col items-center w-full'>
        <div className='flex items-top justify-between gap-4 w-full mb-4'>
          <Text className='text-lg text-left font-bold tracking-tight text-gray-900 dark:text-white' lineClamp={2}>
            {item.name}
          </Text>
          <Menu shadow='md' width={150}>
            <Menu.Target>
              <Button
                styles={theme => ({
                  root: {
                    backgroundColor: 'transparent',
                    border: '1px solid black',
                    paddingLeft: 5,
                    paddingRight: 5,

                    '&:hover': {
                      backgroundColor: 'transparent'
                    }
                  }
                })}
              >
                <IconDotsVertical color='black' />
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={onClickEditHandle} icon={<IconPencil size={14} />}>
                Edit
              </Menu.Item>
              <Menu.Item onClick={onDeleteHandle} color='red' icon={<IconTrash size={14} />}>
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
        <p className='text-sm font-normal text-gray-700 dark:text-gray-400 w-full'>{item.description}</p>
        {item.tags.length !== 0 && (
          <div className='pt-4 w-full'>
            {item.tags.map((tag, i) => (
              <span key={i} className='inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2'>
                #{tag.value}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardDragAndDropItem;
