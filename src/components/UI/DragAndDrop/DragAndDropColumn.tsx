import { FC, FunctionComponent, memo } from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

import { IColumn } from 'shared/types/projects/column.types';

import styles from './dragAndDrop.module.scss';

import DragAndDropItemList from './DragAndDropItemList';

interface IDragAndDropColumn {
  column: IColumn;
  index: number;
  component: FunctionComponent;
}

const DragAndDropColumn: FC<IDragAndDropColumn> = ({ column, index, component }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided: DraggableProvided) => (
        <div className={styles.dropList} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <h2 className='column-title'>{column.title}</h2>
          <DragAndDropItemList column={column} tasks={column.items} component={component} index={index} />
        </div>
      )}
    </Draggable>
  );
};

export default memo(DragAndDropColumn);
