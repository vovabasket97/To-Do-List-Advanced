import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ProjectsSliceActions } from 'store/reducers/projects';
import { TodoSliceActions } from 'store/reducers/todo';

export const useActions = () => {
  const dispatch = useDispatch();
  const combinedReducers = {
    ...TodoSliceActions,
    ...ProjectsSliceActions
  };

  return useMemo(() => bindActionCreators(combinedReducers, dispatch), [dispatch]);
};
