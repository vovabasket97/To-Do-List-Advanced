import { useCallback } from 'react';
import { reorderList } from '../utils/reorder';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { IInitial } from 'shared/types/column.types';
import { DropResult } from 'react-beautiful-dnd';

interface IDrag {
  state: IInitial;
  changeState: (prev: IInitial) => void;
}

export const useDrag = ({ state, changeState }: IDrag) => {
  const data = useTypedSelector(state => state.todo.columns);

  const onDragEnd = useCallback(
    (result: DropResult): void => {
      if (result.destination) {
        if (result.type === 'column') {
          const columnOrder = reorderList(state.columnOrder, result.source.index, result.destination.index);
          changeState({ ...state, columnOrder });
        } else if (result.source.droppableId === result.destination.droppableId) {
          const column = state.columns[result.source.droppableId];
          const items = reorderList(column.items, result.source.index, result.destination.index);

          const newState = { ...state, columns: { ...state.columns, [column.id]: { ...column, items } } };
          changeState(newState);
        } else {
          const sourceColumn = state.columns[result.source.droppableId];
          const destinationColumn = state.columns[result.destination.droppableId];
          const item = { ...sourceColumn.items[result.source.index], status: data[result.destination.droppableId].value };

          const newSourceColumn = { ...sourceColumn, items: [...sourceColumn.items] };
          newSourceColumn.items.splice(result.source.index, 1);

          const newDestinationColumn = { ...destinationColumn, items: [...destinationColumn.items] };

          newDestinationColumn.items.splice(result.destination.index, 0, item);

          const newState = {
            ...state,
            columns: {
              ...state.columns,
              [newSourceColumn.id]: newSourceColumn,
              [newDestinationColumn.id]: newDestinationColumn
            }
          };

          changeState(newState);
        }
      }
    },
    [changeState, data, state]
  );

  return {
    onDragEnd
  };
};
