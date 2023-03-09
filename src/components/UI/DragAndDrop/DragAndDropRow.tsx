import { IColumn } from 'shared/types/column.types';
import { IToDo } from 'shared/types/todo.types';
import { FC, memo } from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { areEqual } from 'react-window';
import DragAndDropItem from './DragAndDropItem';

interface IDragAndDropRow {
  item: IToDo;
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
