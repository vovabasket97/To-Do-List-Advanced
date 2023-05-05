import { FunctionComponent, memo } from 'react';

import DataList from 'components/UI/DataList/DataList';
import DragAndDropContainer from 'components/UI/DragAndDrop';

import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';

import styles from './Projects.module.scss';

import DashboardDragAndDropItem from './DragAndDropItem';
import ProjectsBar from './ProjectsBar';

const Projects = () => {
  const actions = useActions();
  const data = useTypedSelector(state => {
    const current = state.projects.current;
    return {
      data: state.projects.data,
      current
    };
  });

  return (
    <div className={styles.projects}>
      <DataList current={data.current} handler={actions.createNewProject} data={data.data} />
      <div className={styles.content}>
        <ProjectsBar />
        <DragAndDropContainer
          data={data.data[data.current]}
          changeState={actions.changeProjectsState}
          component={DashboardDragAndDropItem as FunctionComponent}
        />
      </div>
    </div>
  );
};

export default memo(Projects);
