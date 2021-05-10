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
    modalInfo: { isOpened: false, type: null, extra: null },
  },
  reducers: {
    setInitialState: (state, { payload }) => {
      const { channels, messages, currentChannelId } = payload;
      state.channelsInfo.channels = [...channels];
      state.channelsInfo.currentChannelId = currentChannelId;
      state.messagesInfo.messages = [...messages];
    },
    switchChannel: (state, { payload }) => {
      state.channelsInfo.currentChannelId = payload;
    },
    addMessage: (state, { payload }) => {
      state.messagesInfo.messages.push(payload);
    },
    addChannel: (state, { payload }) => {
      state.channelsInfo.channels.push(payload);
      switchChannel(payload.id);
    },
    openModal: (state, { payload }) => {
      state.modalInfo = { ...payload };
    },
    closeModal: (state) => {
      state.modalInfo = { isOpened: false, type: null, extra: null };
    },
  },
});

export const {
  setInitialState,
  switchChannel,
  addMessage,
  addChannel,
  openModal,
  closeModal,
} = slice.actions;

export default slice.reducer;
