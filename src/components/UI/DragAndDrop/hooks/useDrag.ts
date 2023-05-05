import { useCallback } from 'react';
import { DropResult } from 'react-beautiful-dnd';

import { TProjectData } from 'shared/types/projects/column.types';

import { reorderList } from '../utils/reorder';

interface IDrag {
  state: TProjectData;
  changeState: (prev: TProjectData) => void;
}

export const useDrag = ({ state, changeState }: IDrag) => {
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
          const item = { ...sourceColumn.items[result.source.index], status: state.columns[result.destination.droppableId].value };

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
    [changeState, state]
  );

  return {
    onDragEnd
  };
};
