import { createSlice } from '@reduxjs/toolkit';
import { initial as initialState, initialToDoItem } from 'configs/todo/getInitialToDo';

const TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    changeCurrentToDo: (state, action) => {
      state.current = action.payload;
    },
    createNewToDo: (state, action) => {
      state.data = [...state.data, initialToDoItem(action.payload)];
      state.current = state.data.length - 1;
    }
  }
});

export const TodoSliceActions = TodoSlice.actions;

export default TodoSlice.reducer;
