import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from 'components/Header';
import Dashboard from 'components/Layout/Dashboard/Dashboard';
import Projects from 'components/Layout/Projects/Projects';
import ToDo from 'components/Layout/ToDo/ToDo';
import Content from 'components/UI/Content/Content';

import { routes } from './routes';

const Home = () => {
  return (
    <div className='home'>
      <BrowserRouter>
        <Header />
        <Content>
          <Routes>
            <Route index path={routes.dashboard.path} element={<Dashboard />} />
            <Route path={routes.projects.path} element={<Projects />} />
            <Route path={routes.todo.path} element={<ToDo />} />
          </Routes>
        </Content>
      </BrowserRouter>
    </div>
  );
};

export default Home;
