import { useCallback, memo } from 'react';

import AsyncSearch from 'components/UI/input/Search/AsyncSearch';
import SearchTaskItem from './SearchTaskItem';

import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';

import { IToDo } from 'shared/types/todo.types';
import styles from './header.module.scss';
import { IColumn } from 'shared/types/column.types';

const Header = () => {
  const actions = useActions();
  const tasks = useTypedSelector(state => state.todo);

  const onChangeSearchHandler = useCallback(
    async (value: string) => {
      const data = async () => {
        // const res = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments').then(res => res.json());
        // return res.map(el => value + el.email);
        return Object.values(tasks.columns as IColumn)
          .map(el => el.items)
          .flat()
          .filter(el => el.name.toLowerCase().includes(value.toLowerCase()));
      };
      const newData: Awaited<IToDo[]> = await data();
      return newData;
    },
    [tasks]
  );

  const onSubmitSearchHandler = useCallback(
    (item: IToDo) => {
      actions.changeDrawerToDoItem(true);
      actions.changeLastOpenedItemId(item.value);
    },
    [actions]
  );

  return (
    <div className={styles.header}>
      <h2 className={styles.header__title}>Hello, Richard</h2>
      <div className={styles.header__bar}>
        <div className={styles.search}>
          <AsyncSearch itemComponent={SearchTaskItem} onChange={onChangeSearchHandler} onSubmit={onSubmitSearchHandler} />
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
