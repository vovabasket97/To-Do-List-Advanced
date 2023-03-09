import { FunctionComponent, memo } from 'react';

import DashboardDragAndDropItem from './DashboardDragAndDropItem';
import DragAndDropContainer from 'components/UI/DragAndDrop';

import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';

const Dashboard = () => {
  const actions = useActions();
  const data = useTypedSelector(state => state.todo);

  return (
    <DragAndDropContainer data={data} changeState={actions.changeTodoState} component={DashboardDragAndDropItem as FunctionComponent} />
  );
};

export default memo(Dashboard);
