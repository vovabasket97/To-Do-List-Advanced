import { useCallback, memo } from 'react';

import AsyncSearch from 'components/UI/input/Search/AsyncSearch';
import SearchTaskItem from './SearchTaskItem';

import styles from './header.module.scss';
import { routes } from 'pages/routes';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { ReactComponent as Logo } from 'images/logo.svg';

const routesArr = Object.values(routes);

const Header = () => {
  const location = useLocation();

  const onChangeSearchHandler = useCallback(async (value: string) => {
    // const data = async () => {
    //   // const res = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments').then(res => res.json());
    //   // return res.map(el => value + el.email);
    //   return Object.values(tasks.columns as IColumn)
    //     .map(el => el.items)
    //     .flat()
    //     .filter(el => el.name.toLowerCase().includes(value.toLowerCase()));
    // };
    // const newData: Awaited<IToDo[]> = await data();
    // return newData;
    return [];
  }, []);

  const onSubmitSearchHandler = useCallback((item: any) => {
    // actions.changeDrawerToDoItem(true);
    // actions.changeLastOpenedItemId(item.value);
  }, []);

  return (
    <div className={styles.header}>
      <Link to={routes.dashboard.path} className={styles.logo}>
        <Logo />
      </Link>
      <div className={styles.menu}>
        {routesArr.map((route, i) => (
          <Link
            key={i}
            to={route.path}
            className={cn(styles.menu__item, {
              [styles.active]: location.pathname === route.path
            })}
          >
            <span>
              <route.icon />
            </span>
            <p>{route.label}</p>
          </Link>
        ))}
      </div>
      <div className={styles.search}>
        <AsyncSearch itemComponent={SearchTaskItem} onChange={onChangeSearchHandler} onSubmit={onSubmitSearchHandler} />
      </div>
      <div className={styles.avatar}>A</div>
    </div>
  );
};

export default memo(Header);
