import { createSlice } from '@reduxjs/toolkit';

export const isDummyActiveChannel = (activeChannel) => activeChannel.id === '123';

const channelSlice = createSlice({
  name: 'channels',
  initialState: {
    activeChannel: { id: '123' },
    isPrivateChannelMode: false,
  },
  reducers: {
    setActiveChannel: {
      reducer(state, action) {
        const { channel } = action.payload;
        state.activeChannel = channel;
      },
    },
    setIsPrivateChannelMode(state, action) {
      state.isPrivateChannelMode = action.payload;
    },
  },
});

export const { setActiveChannel, setIsPrivateChannelMode } = channelSlice.actions;
export default channelSlice.reducer;
