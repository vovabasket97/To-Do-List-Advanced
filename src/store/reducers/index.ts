import { combineReducers } from '@reduxjs/toolkit';
import ProjectsReducer from './projects';
import ToDoReducer from './todo';

export const rootReducer = combineReducers({
  projects: ProjectsReducer,
  todo: ToDoReducer
});
