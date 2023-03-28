import DataList from 'components/UI/DataList/DataList';

import { useTypedSelector } from 'hooks/useTypedSelector';
import { useActions } from 'hooks/useActions';

import styles from './ToDo.module.scss';

const ToDo = () => {
  const actions = useActions();
  const todosLists = useTypedSelector(state => state.todo);

  return (
    <div className={styles.todo}>
      <DataList current={todosLists.current} data={todosLists.data} handler={actions.createNewToDo} popUpTitle='Create Todo List' />
      <div className={styles.content}></div>
    </div>
  );
};

export default ToDo;
