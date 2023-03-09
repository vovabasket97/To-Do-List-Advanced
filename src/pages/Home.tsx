import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from 'components/Layout/Dashboard';

import Sidebar from 'components/Sidebar';
import Content from 'components/UI/Content';
import AddTask from 'components/Layout/AddTask';
import Account from 'components/Layout/Account';
import Settings from 'components/Layout/Settings';

import { routes } from './routes';

const Home = () => {
  return (
    <div className='home'>
      <BrowserRouter>
        <Sidebar />
        <Content>
          <Routes>
            <Route index path={routes.dashboard} element={<Dashboard />} />
            <Route path={routes.add} element={<AddTask />} />
            <Route path={routes.account} element={<Account />} />
            <Route path={routes.settings} element={<Settings />} />
          </Routes>
        </Content>
      </BrowserRouter>
    </div>
  );
};

export default Home;
