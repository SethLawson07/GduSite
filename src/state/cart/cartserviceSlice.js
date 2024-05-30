import { createSlice } from '@reduxjs/toolkit';

export const cartserviceSlice = createSlice({
  name: 'service',
  initialState: {
    services: []
  },
  reducers: {
    addserviceToCart: (state, action) => {
      const newService = {
        ...action.payload,
        quantity: 1 
      };
      state.services.push(newService);
    },
    removeserviceFromCart: (state, action) => {
      state.services = state.services.filter(service => service.id !== action.payload);
    },
    updateserviceQuantity: (state, action) => {
      const { id, newQuantity } = action.payload;
      state.services = state.services.map(service =>
        service.id === id ? { ...service, quantity: Number(newQuantity) } : service
      );
    },
    emptyserviceCart: (state) => {
      state.services = [];
    }
  }
});

export const { addserviceToCart, removeserviceFromCart, updateserviceQuantity, emptyserviceCart } = cartserviceSlice.actions;

export const selectCartServices = state => state.service.services;

export default cartserviceSlice.reducer;
