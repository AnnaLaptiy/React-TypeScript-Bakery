import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

import axios from 'axios';

type PropsType = {
  activeCategory: number;
  filter?: string;
  searchValue?: string;
  currentPage: number;
};

export type ItemType = {
  id: number;
  firstImage: string;
  secondImage?: string;
  title: string;
  secondTitle: string;
  description: string;
  size?: string;
  weight?: string;
  compound?: string;
  price: number;
};

//или так : export const fetchPies = createAsyncThunk('pies/fetchPies', async (props:PropsType) => { return data as ItemType[]
export const fetchPies = createAsyncThunk<{ data: ItemType[]; pagesCount: number }, PropsType>(
  'pies/fetchPies',
  async (props) => {
    const res = await axios.get<ItemType[]>(
      `https://63defbd13d94d02c0bb2ee5d.mockapi.io/pies?${props.filter}${
        props.activeCategory > 0 ? `&category=${props.activeCategory}` : ``
      }${props.searchValue ? `&search=${props.searchValue}` : ``}`,
    );

    const pagesCount = Math.ceil(res.data.length / 11);
    const { data } = await axios.get<ItemType[]>(
      `https://63defbd13d94d02c0bb2ee5d.mockapi.io/pies?${props.filter}${
        props.activeCategory > 0 ? `&category=${props.activeCategory}` : ``
      }${props.searchValue ? `&search=${props.searchValue}` : ``}&limit=11&page=${
        props.currentPage - 1 <= pagesCount ? props.currentPage : 1
      }`,
    );
    return { data, pagesCount };
  },
);

export const fetchItemById = createAsyncThunk('pies/fetchPie', async (id: number) => {
  const { data } = await axios.get<ItemType[]>(
    `https://63defbd13d94d02c0bb2ee5d.mockapi.io/pies?id=${id}`,
  );
  return data as ItemType[];
});

enum status {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}

interface PiesSliceState {
  items: ItemType[];
  currentItem: ItemType;
  pagesCount: number;
  status: status;
}

const initialState: PiesSliceState = {
  items: [],
  currentItem: {} as ItemType,
  pagesCount: 0,
  status: status.LOADING,
};

export const piesSlice = createSlice({
  name: 'pie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPies.pending, (state, action) => {
      state.items = [];
      state.pagesCount = 0;
      state.status = status.LOADING;
    });
    builder.addCase(fetchPies.fulfilled, (state, action) => {
      state.items = action.payload.data;
      state.pagesCount = action.payload.pagesCount;
      state.status = status.LOADED;
    });
    builder.addCase(fetchPies.rejected, (state, action) => {
      state.items = [];
      state.pagesCount = 0;
      state.status = status.ERROR;
    });
    builder.addCase(fetchItemById.pending, (state, action) => {
      state.currentItem = {} as ItemType;
      state.status = status.LOADING;
    });
    builder.addCase(fetchItemById.fulfilled, (state, action) => {
      state.currentItem = action.payload[0];
      state.status = status.LOADED;
    });
    builder.addCase(fetchItemById.rejected, (state, action) => {
      state.currentItem = {} as ItemType;
      state.status = status.ERROR;
    });
  },

  // как было до типизации:
  // extraReducers:  {
  //   [fetchPies.pending]: (state, action) => {
  //     state.items = [];
  //     state.status = 'loading';
  //   },
  //   [fetchPies.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'loaded';
  //   },
  //   [fetchPies.rejected]: (state, action) => {
  //     state.items = [];
  //     state.status = 'error';
  //   },
  //   [fetchItemById.pending]: (state, action) => {
  //     state.currentItem = [];
  //     state.status = 'loading';
  //   },
  //   [fetchItemById.fulfilled]: (state, action) => {
  //     state.currentItem = action.payload[0];
  //     state.status = 'loaded';
  //   },
  //   [fetchItemById.rejected]: (state, action) => {
  //     state.currentItem = [];
  //     state.status = 'error';
  //   },
  // },
});

export const selectPie = (state: RootState) => state.pie;
export default piesSlice.reducer;
