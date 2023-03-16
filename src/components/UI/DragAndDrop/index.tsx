import { FC, FunctionComponent, memo } from 'react';

import { DragDropContext, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import DragAndDropColumn from './DragAndDropColumn';

import { useDrag } from './hooks/useDrag';

import styles from './dragAndDrop.module.scss';
import { TProjectData } from 'shared/types/projects/column.types';

interface IDragAndDropContainer {
  data: TProjectData;
  changeState: (prev: TProjectData) => void;
  component: FunctionComponent;
}

const DragAndDropContainer: FC<IDragAndDropContainer> = ({ data: state, changeState, component }) => {
  const { onDragEnd } = useDrag({ state, changeState });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.columns}>
        <Droppable droppableId='all-columns' direction='horizontal' type='column'>
          {(provided: DroppableProvided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {state.columnOrder.map((columnId, index) => (
                <DragAndDropColumn key={columnId} column={state.columns[columnId]} index={index} component={component} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default memo(DragAndDropContainer);
