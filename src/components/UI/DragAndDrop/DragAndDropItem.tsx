import { IColumn } from 'shared/types/column.types';
import { IToDo } from 'shared/types/todo.types';
import { FC } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';

interface IDragAndDropItem {
  provided: DraggableProvided;
  item: IToDo;
  column: IColumn;
  isDragging: boolean;
  component: any;
}

const DragAndDropItem: FC<IDragAndDropItem> = ({ provided, item, column, isDragging = false, component: Component }) => {
  return (
    <div
      className={`item ${isDragging ? 'is-dragging' : ''}`}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      <Component item={item} column={column} isDragging={isDragging} />
    </div>
  );
};

export default DragAndDropItem;
