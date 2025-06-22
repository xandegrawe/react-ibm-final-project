import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    numOfItems: 0
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }

      state.numOfItems += 1;
    },

    removeItem: (state, action) => {
      const { name } = action.payload;
      const itemToRemove = state.items.find(item => item.name === name);
    
      if (itemToRemove) {
        state.numOfItems -= itemToRemove.quantity;
        if (state.numOfItems < 0) state.numOfItems = 0;
    
        state.items = state.items.filter(item => item.name !== name);
      }
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
    
      if (existingItem && quantity >= 0) {
        const difference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.numOfItems += difference;
    
        if (state.numOfItems < 0) state.numOfItems = 0;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
