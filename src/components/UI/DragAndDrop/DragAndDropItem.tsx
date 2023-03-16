import { IColumn } from 'shared/types/projects/column.types';
import { IProject } from 'shared/types/projects/projects.types';
import { FC } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';

interface IDragAndDropItem {
  provided: DraggableProvided;
  item: IProject;
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
