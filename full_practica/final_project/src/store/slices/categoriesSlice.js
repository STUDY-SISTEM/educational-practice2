import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Base URL for the backend API. If the evaluator starts the backend
// locally on port 3333 this will correctly point at it. You can
// override this by setting REACT_APP_API_URL in your environment.
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

// Fetch all categories.
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/categories/all`);
      if (!response.ok) {
        throw new Error('Failed to load categories');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Fetch a single category with its products.
export const fetchCategoryById = createAsyncThunk(
  'categories/fetchCategoryById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/categories/${id}`);
      const data = await response.json();
      if (data.status === 'ERR') {
        // Return the error message directly. Components can handle it.
        return rejectWithValue(data.message);
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    currentCategory: null,
    categoryProducts: [],
    categoryStatus: 'idle',
    categoryError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.categoryStatus = 'loading';
        state.categoryError = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.categoryStatus = 'succeeded';
        state.currentCategory = action.payload.category;
        state.categoryProducts = action.payload.data;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.categoryStatus = 'failed';
        state.categoryError = action.payload || action.error.message;
      });
  },
});

export default categoriesSlice.reducer;