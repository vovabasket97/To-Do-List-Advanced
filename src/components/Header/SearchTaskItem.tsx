import { forwardRef } from 'react';

import { createStyles, Text } from '@mantine/core';

const useStyles = createStyles(theme => ({
  item: {
    ...theme.fn.focusStyles(),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    width: '100%'
  },

  itemDragging: {
    boxShadow: theme.shadows.sm
  }
}));

interface ISearchTaskItem {
  name: string;
  id: string;
  className: string;
  [key: string]: string;
}

const SearchTaskItem = forwardRef<HTMLDivElement, ISearchTaskItem>(({ name, id, className, ...others }, ref) => {
  const { classes, cx } = useStyles();
  const hover = others['data-hovered'] ? 'bg-gray-300 text-white' : 'bg-transparent';

  return (
    <div
      ref={ref}
      className={`mb-2 last:mb-0 cursor-pointer transition-all duration-300 ${cx(
        classes.item
      )} ${hover} hover:bg-gray-300 hover:text-white`}
      {...others}
    >
      <Text align='left' className='text-sm font-bold tracking-tight text-gray-900 dark:text-white' lineClamp={2}>
        {name}
      </Text>
    </div>
  );
});

export default SearchTaskItem;
