import { useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { Navbar, Center, Stack, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconGauge, IconLogout, IconUser, IconPlaylistAdd } from '@tabler/icons';
import { routes } from 'pages/routes';

import SidebarItem from './SidebarItem';
import { useCallback } from 'react';

const mockdata = [
  { id: 1, url: routes.dashboard, label: 'Dashboard', icon: IconGauge },
  { id: 2, url: routes.add, label: 'Add task', icon: IconPlaylistAdd },
  { id: 3, url: routes.account, label: 'Account', icon: IconUser }
];

const Sidebar = () => {
  const location = useLocation();
  const theme = useMantineTheme();
  const { pathname } = location;
  const replacedPath = pathname.replace('/', '');

  const [active, setActive] = useState(replacedPath === '' ? 0 : mockdata.findIndex(el => el.url === replacedPath));

  const links = mockdata.map((link, index) => (
    <SidebarItem {...link} key={link.label} active={index === active} onClick={() => setActive(index)} />
  ));

  const onClickLogoHandler = useCallback(() => setActive(0), []);

  return (
    <Navbar
      height='100vh'
      style={{ position: 'sticky', top: '0' }}
      width={{ base: 80 }}
      p='md'
      sx={theme => ({
        backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background
      })}
    >
      <Center>
        <Link to='/' onClick={onClickLogoHandler}>
          <ActionIcon color={theme.white} size='xl' radius='md' variant='transparent'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-brand-asana'
              width={24}
              height={24}
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='#fff'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
              <circle cx={12} cy={7} r={3}></circle>
              <circle cx={17} cy={16} r={3}></circle>
              <circle cx={7} cy={16} r={3}></circle>
            </svg>
          </ActionIcon>
        </Link>
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify='center' spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <SidebarItem icon={IconLogout} label='Logout' active={false} />
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
