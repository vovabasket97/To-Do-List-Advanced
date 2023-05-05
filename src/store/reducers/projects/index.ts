import { createSlice } from '@reduxjs/toolkit';

import { IColumn, IInitial } from 'shared/types/projects/column.types';

import { generateItem } from 'utils/generateItem';

import { draftProject, initial as initialState } from 'configs/projects/getInitialProjects';

function getCurrentData(state: IInitial) {
  return state.data[state.current].columns;
}

const ProjectsSlice = createSlice({
  name: 'projects',
  initialState: {
    ...initialState,
    lastOpenedItemId: null,
    drawer: false
  },
  reducers: {
    changeCurrentProject: (state, action) => {
      state.current = action.payload;
    },
    changeDrawerToDoItem: (state, action) => {
      state.drawer = action.payload;
    },
    changeLastOpenedItemId: (state, action) => {
      state.lastOpenedItemId = action.payload;
    },
    createNewProject: (state, action) => {
      state.data = [...state.data, draftProject(action.payload)];
      state.current = state.data.length - 1;
    },
    changeProjectsState: (state, action) => {
      state.data[state.current] = action.payload;
    },
    addNewProjectsState: (state, action) => {
      const { title, description, type, tags } = action.payload;
      const currentColumns = getCurrentData(state);
      const columnByType = Object.values(currentColumns).find(el => el.value === type) as IColumn;
      currentColumns[columnByType.id].items = [
        ...currentColumns[columnByType.id].items,
        generateItem({ name: title, description, status: type, tags: [...tags] || [] })
      ];
    },
    removeProjectsItem: (state, action) => {
      const { columnId, newItems } = action.payload;
      const currentColumns = getCurrentData(state);
      currentColumns[columnId].items = newItems;
    },
    editProjectsItems: (state, action) => {
      const { value: id, status, oldStatus } = action.payload;
      const currentColumns = getCurrentData(state);
      const columnOld = Object.values(currentColumns).find(el => el.value === oldStatus) as IColumn;
      const columnNew = Object.values(currentColumns).find(el => el.value === status) as IColumn;
      let element = { ...action.payload };
      delete element.oldStatus;

      // if item in the same list
      if (columnNew.id === columnOld.id) {
        currentColumns[columnNew.id].items = currentColumns[columnNew.id].items.map(el => {
          if (el.value === id) return element;
          return el;
        });
      } else {
        // when list was changed
        currentColumns[columnOld.id].items = currentColumns[columnOld.id].items.filter(el => el.value !== id);
        currentColumns[columnNew.id].items = [element, ...currentColumns[columnNew.id].items];
      }
    }
  }
});

export const ProjectsSliceActions = ProjectsSlice.actions;

export default ProjectsSlice.reducer;
