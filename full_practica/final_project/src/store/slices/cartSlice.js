import { createSlice } from '@reduxjs/toolkit';

// Helper to load cart from localStorage. If it fails return empty array.
function loadCart() {
  try {
    const data = localStorage.getItem('cart');
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.warn('Could not load cart from localStorage:', err);
  }
  return [];
}

// Persist cart to localStorage
function saveCart(items) {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
  } catch (err) {
    console.warn('Could not save cart to localStorage:', err);
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCart(),
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      saveCart(state.items);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      saveCart(state.items);
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity += 1;
      }
      saveCart(state.items);
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // remove item if quantity would go below 1
          state.items = state.items.filter((i) => i.id !== id);
        }
      }
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCart(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;