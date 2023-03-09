import { IColumn } from 'shared/types/column.types';
import { Group, ScrollArea } from '@mantine/core';
import { useLayoutEffect, useRef, memo, FC, FunctionComponent } from 'react';

import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import DragAndDropRow from './DragAndDropRow';
import { IToDo } from 'shared/types/todo.types';

interface IDragAndDropItemList {
  column: IColumn;
  tasks: IToDo[];
  index: number;
  component: FunctionComponent;
}

const DragAndDropItemList: FC<IDragAndDropItemList> = ({ column, tasks, index, component }) => {
  const listRef = useRef<Element>();

  useLayoutEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTo({ top: 0 });
  }, [index]);

  return (
    <Droppable droppableId={column.id} type='task'>
      {(provided: DroppableProvided) => (
        <div style={{ height: '100%' }} {...provided.droppableProps} ref={provided.innerRef}>
          <ScrollArea.Autosize maxHeight={450} scrollbarSize={6} offsetScrollbars>
            <Group spacing='xs' style={{ paddingRight: '3px' }}>
              {tasks.map((task, i) => {
                if (!task) return;
                return <DragAndDropRow key={task.value} item={task} index={i} column={column} component={component} />;
              })}
              {provided.placeholder}
            </Group>
          </ScrollArea.Autosize>
        </div>
      )}
    </Droppable>
  );
};

export default memo(DragAndDropItemList);
