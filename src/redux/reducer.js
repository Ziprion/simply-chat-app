import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'chatInfo',
  initialState: {
    channelsInfo: {
      channels: [],
      currentChannelId: null,
    },
    messagesInfo: {
      messages: [],
    },
  },
  reducers: {
    setInitialState: (state, { payload }) => {
      const { channels, messages, currentChannelId } = payload;
      state.channelsInfo.channels = [...channels];
      state.channelsInfo.currentChannelId = currentChannelId;
      state.messagesInfo.messages = [...messages];
    },
  },
});

export const { setInitialState } = slice.actions;

export default slice.reducer;
