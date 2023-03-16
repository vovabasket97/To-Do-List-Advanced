import { useCallback } from 'react';
import { useTypedSelector } from 'hooks/useTypedSelector';

import AddProject from './AddProject';

import cn from 'classnames';
import { useActions } from 'hooks/useActions';
import { useDisclosure } from '@mantine/hooks';

import { TProjectData } from 'shared/types/projects/column.types';
import { IconPlus } from '@tabler/icons';
import styles from './ProjectsList.module.scss';

const ProjectsList = () => {
  const actions = useActions();
  const current = useTypedSelector(state => state.projects.current);
  const list = useTypedSelector(state => state.projects.data);

  const [opened, { open, close }] = useDisclosure(false);

  const handler = useCallback(
    (values: object) => {
      close();
      actions.createNewProject(values);
    },
    [close]
  );

  return (
    <div className={styles.projectsList}>
      {list.map(({ id, name }: TProjectData, index: number) => (
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
      {opened && <AddProject opened={opened} handler={handler} close={close} />}
    </div>
  );
};

export default ProjectsList;
