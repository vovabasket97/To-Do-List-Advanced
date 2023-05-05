import { FC, memo } from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { areEqual } from 'react-window';

import { IColumn } from 'shared/types/projects/column.types';
import { IProject } from 'shared/types/projects/projects.types';

import DragAndDropItem from './DragAndDropItem';

interface IDragAndDropRow {
  item: IProject;
  index: number;
  column: IColumn;
  component: any;
}

const DragAndDropRow: FC<IDragAndDropRow> = ({ item, index, column, component }) => {
  return (
    <Draggable draggableId={String(item.value)} index={index}>
      {(provided: DraggableProvided, snapshot) => (
        <DragAndDropItem provided={provided} isDragging={snapshot.isDragging} column={column} component={component} item={item} />
      )}
    </Draggable>
  );
};

export default memo(DragAndDropRow, areEqual);
