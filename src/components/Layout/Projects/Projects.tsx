import { FunctionComponent, memo } from 'react';

import DashboardDragAndDropItem from './DragAndDropItem';
import DragAndDropContainer from 'components/UI/DragAndDrop';
import ProjectsList from './ProjectsList/ProjectsList';

import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';

import styles from './Projects.module.scss';

const Projects = () => {
  const actions = useActions();
  const data = useTypedSelector(state => {
    const current = state.projects.current;
    return state.projects.data[current];
  });

  return (
    <div className={styles.projects}>
      <ProjectsList />
      <div className={styles.content}>
        <DragAndDropContainer
          data={data}
          changeState={actions.changeProjectsState}
          component={DashboardDragAndDropItem as FunctionComponent}
        />
      </div>
    </div>
  );
};

export default memo(Projects);
