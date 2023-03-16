import { createSlice } from '@reduxjs/toolkit';
import { mockToDos as initialState } from 'configs/todo/getInitialToDo';

const TodoSlice = createSlice({
  name: 'todo',
  initialState: {
    ...initialState,
    lastOpenedItemId: null,
    drawer: false
  },
  reducers: {}
});

export const TodoSliceActions = TodoSlice.actions;

export default TodoSlice.reducer;
