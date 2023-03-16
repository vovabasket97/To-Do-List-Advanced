import { ProjectsSliceActions } from 'store/reducers/projects';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(ProjectsSliceActions, dispatch), [dispatch]);
};
