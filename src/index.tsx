import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { store } from './store';
import { NotificationsProvider } from '@mantine/notifications';

import Home from './pages/Home';

import './styles/main.scss';

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
