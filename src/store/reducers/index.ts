import { combineReducers } from '@reduxjs/toolkit';
import TodoReducer from './todo';

export const rootReducer = combineReducers({
  todo: TodoReducer
});
