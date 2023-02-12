import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FilterSliceState{
  searchValue:string,
  activeSortItem:number,
  activeCategory:number,
  currentPage:number,
};

const initialState:FilterSliceState = {
  searchValue: '',
  activeSortItem: 5,
  activeCategory: 0,
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue: (state, action:PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setActiveSortItem: (state,  action:PayloadAction<number>) => {
      state.activeSortItem = action.payload;
    },
    setActiveCategory: (state, action:PayloadAction<number>) => {
      state.activeCategory = action.payload;
    },
    setCurrentPage: (state, action:PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action:PayloadAction<FilterSliceState>) => {
      state.currentPage = action.payload.currentPage;
      state.activeCategory = action.payload.activeCategory;
      state.activeSortItem = action.payload.activeSortItem;
    },
  },
});

export const selectActiveCategory = (state:RootState) => state.filter.activeCategory;
export const selectActiveSortItem = (state:RootState) => state.filter.activeSortItem;
export const selectFilter = (state:RootState) => state.filter;

export const { setActiveSortItem, setActiveCategory, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
