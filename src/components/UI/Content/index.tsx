import { FC, PropsWithChildren } from 'react';

import SidebarEditer from 'components/Layout/Dashboard/SidebarEditor';
import Header from 'components/Header';

import { useTypedSelector } from 'hooks/useTypedSelector';

import styles from './content.module.scss';

const Content: FC<PropsWithChildren> = ({ children }) => {
  const opened = useTypedSelector(state => state.todo.drawer);

  return (
    <div className={styles.content}>
      <Header />
      <SidebarEditer opened={opened} />
      <div className={styles.content__wrapper}>{children}</div>
    </div>
  );
};

export default Content;
