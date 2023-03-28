import { useCallback } from 'react';

import AddDataItem from './AddDataItem';

import cn from 'classnames';
import { useActions } from 'hooks/useActions';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons';
import styles from './DataList.module.scss';

interface IDataList {
  current: number;
  data: { id: string; name: string }[];
  popUpTitle?: string;
  handler: (values: object) => void;
}

const DataList = ({ current, data, handler, popUpTitle = 'Create project' }: IDataList) => {
  const actions = useActions();

  const [opened, { open, close }] = useDisclosure(false);

  const createHandler = useCallback(
    (values: object) => {
      close();
      handler(values);
    },
    [close, handler]
  );

  return (
    <div className={styles.projectsList}>
      {data.map(({ id, name }: { id: string; name: string }, index: number) => (
        <div
          key={id}
          onClick={() => actions.changeCurrentProject(index)}
          className={cn(styles.item, {
            [styles.active]: index === current
          })}
        >
          <span>{name.slice(0, 3).toLocaleUpperCase()}</span>
        </div>
      ))}
      <div className={styles.item} onClick={() => open()}>
        <span>
          <IconPlus />
        </span>
      </div>
      {opened && <AddDataItem title={popUpTitle} opened={opened} handler={createHandler} close={close} />}
    </div>
  );
};

export default DataList;
