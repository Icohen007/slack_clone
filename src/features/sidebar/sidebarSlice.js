import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    sidebarOpen: true,
  },
  reducers: {
    setSidebarOpen: {
      reducer(state, action) {
        state.sidebarOpen = action.payload;
      },
    },
    toggleSidebar: {
      reducer(state) {
        state.sidebarOpen = !state.sidebarOpen;
      },
    },
  },
});

export const { setSidebarOpen, toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
