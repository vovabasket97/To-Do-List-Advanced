import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './styles/main.scss';

import Home from './pages/Home';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        <Home />
      </NotificationsProvider>
    </MantineProvider>
  </Provider>
);
