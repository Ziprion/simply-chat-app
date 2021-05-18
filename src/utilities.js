import { useSelector } from 'react-redux';

export const setFocus = (element) => {
  document.querySelector(element) === null
    ? null
    : document.querySelector(element).focus();
};
export const resetForm = (element) => {
  document.getElementById(element) === null
    ? null
    : document.getElementById(element).reset();
};

export const getModalStatus = () =>
  useSelector((state) => state.modalInfo.isOpened);

export const getCurrentModal = () =>
  useSelector((state) => state.modalInfo.type);

export const getExtraId = () => useSelector((state) => state.modalInfo.extra);

export const getChannels = () =>
  useSelector((state) => state.channelsInfo.channels);

export const getChannelById = (id) =>
  getChannels().filter((channel) => channel.id === id)[0];

export const getCurrentChannel = () =>
  useSelector((state) => state.channelsInfo.currentChannelId);
