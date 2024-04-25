import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = {
        ...action.payload,
        quantity: 1 // Définir la quantité par défaut à 1
      };
      state.items.push(newItem);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { itemId, newQuantity } = action.payload;
      state.items = state.items.map(item =>
        item.id === itemId ? { ...item, quantity: Number(newQuantity) } : item
      );
    },
    emptyCart: (state) => {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, emptyCart } = cartSlice.actions;

export const selectCartItems = state => state.cart.items;

export default cartSlice.reducer;
