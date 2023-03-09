import { createSlice } from '@reduxjs/toolkit';
import { generateToDoItem } from 'utils/generateToDoItem';
import { initial } from 'configs/todo/getInitialData';
import { IColumn } from 'shared/types/column.types';

const initialState = initial;

const TodoSlice = createSlice({
  name: 'todo',
  initialState: {
    ...initialState,
    lastOpenedItemId: null,
    drawer: false
  },
  reducers: {
    changeDrawerToDoItem: (state, action) => {
      state.drawer = action.payload;
    },
    changeLastOpenedItemId: (state, action) => {
      state.lastOpenedItemId = action.payload;
    },
    changeTodoState: (state, action) => {
      return (state = action.payload);
    },
    addNewTodoState: (state, action) => {
      const { title, description, type } = action.payload;
      const columnByType = Object.values(state.columns).find(el => el.value === type) as IColumn;
      state.columns[columnByType.id].items = [
        ...state.columns[columnByType.id].items,
        generateToDoItem({ name: title, description, status: type })
      ];
    },
    removeToDoItem: (state, action) => {
      const { columnId, newItems } = action.payload;
      state.columns[columnId].items = newItems;
    },
    editToDoItems: (state, action) => {
      const { value: id, status, oldStatus } = action.payload;
      const columnOld = Object.values(state.columns).find(el => el.value === oldStatus) as IColumn;
      const columnNew = Object.values(state.columns).find(el => el.value === status) as IColumn;
      let element = { ...action.payload };
      delete element.oldStatus;

      // if item in the same list
      if (columnNew.id === columnOld.id) {
        state.columns[columnNew.id].items = state.columns[columnNew.id].items.map(el => {
          if (el.value === id) return element;
          return el;
        });
      } else {
        // when list was changed
        state.columns[columnOld.id].items = state.columns[columnOld.id].items.filter(el => el.value !== id);
        state.columns[columnNew.id].items = [element, ...state.columns[columnNew.id].items];
      }
    }
  }
});

export const TodoSliceActions = TodoSlice.actions;

export default TodoSlice.reducer;
