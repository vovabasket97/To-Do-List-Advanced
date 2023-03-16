import { FC, PropsWithChildren } from 'react';
import styles from './Content.module.scss';

const Content: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};

export default Content;
