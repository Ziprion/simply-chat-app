import { useSelector, useDispatch } from 'react-redux';

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

export const getCurrentType = () =>
  useSelector((state) => state.modalInfo.type);

export const handleEscKey = () => {
  const handleEsc = ({ keyCode }) => {
    if (keyCode === 27) {
      document.removeEventListener('keydown', handleEsc);
      useDispatch(closeModal());
      setFocus('input[name="body"]');
    }
  };
  const activeModal = document.querySelector('.modal.show');
  if (activeModal !== null) {
    document.addEventListener('keydown', handleEsc);
  }
};
