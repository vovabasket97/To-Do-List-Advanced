import { FC, forwardRef } from 'react';

import { Link } from 'react-router-dom';
import { createStyles, Tooltip, UnstyledButton } from '@mantine/core';

const useStyles = createStyles(theme => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.white,
    opacity: 0.85,

    '&:hover': {
      opacity: 1,
      backgroundColor: theme.fn.lighten(theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background as string, 0.1)
    }
  },

  active: {
    opacity: 1,
    '&, &:hover': {
      backgroundColor: theme.fn.lighten(theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background as string, 0.15)
    }
  }
}));

interface IContent {
  url?: string;
  icon: any;
  label: string;
  active: boolean;
  onClick?: () => void;
}

const Content = forwardRef<HTMLButtonElement, IContent>(({ icon: Icon, active, onClick }, ref) => {
  const { classes, cx } = useStyles();

  return (
    <UnstyledButton ref={ref} onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
      <Icon stroke={1.5} />
    </UnstyledButton>
  );
});

const SidebarItem: FC<IContent> = props => {
  const { label, url } = props;

  const children = url ? (
    <Link to={url}>
      <Content {...props} />
    </Link>
  ) : (
    <Content {...props} />
  );

  return (
    <Tooltip label={label} position='right' transitionDuration={0}>
      {children}
    </Tooltip>
  );
};

export default SidebarItem;
