import { createSlice } from '@reduxjs/toolkit';

export const wishListSlice = createSlice({
  name: 'wishList',
  initialState: {
    items: []
  },
  reducers: {
    addToWishList: (state, action) => {
      const newItem = {
        ...action.payload
      };      
      state.items.push(newItem);
    },
    removeFromWishList: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    emptyWishList: (state) => {
      state.items = [];
    }
  }
});

export const { addToWishList, removeFromWishList, emptyWishList } = wishListSlice.actions;

export const selectWishListItems = state => state.wishList.items;

export default wishListSlice.reducer;
