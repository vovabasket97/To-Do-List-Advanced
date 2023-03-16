import { combineReducers } from '@reduxjs/toolkit';
import ProjectsReducer from './projects';

export const rootReducer = combineReducers({
  projects: ProjectsReducer
});
