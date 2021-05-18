import { useSelector, useDispatch } from 'react-redux';

import { closeModal, switchChannel } from './redux/reducer.js';

// const dispatch = useDispatch();

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
