import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    sidebarOpen: false,
    metaPanelOpen: false,
  },
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleMetaPanel(state) {
      state.metaPanelOpen = !state.metaPanelOpen;
    },
  },
});

export const { toggleSidebar, toggleMetaPanel } = sidebarSlice.actions;

export default sidebarSlice.reducer;
