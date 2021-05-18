import React, { useEffect } from 'react';
import ModalAdd from './ModalAdd';
import ModalRename from './ModalRename';
import ModalRemove from './ModalRemove';
import { resetForm, setFocus, getModalStatus } from '../../../utilities.js';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { closeModal } from '../../../redux/reducer';

const Modals = () => {
  const dispatch = useDispatch();
  const isOpened = getModalStatus();

  const handleEsc = ({ keyCode }) => {
    if (keyCode === 27 && isOpened) {
      document.removeEventListener('keydown', handleEsc);
      dispatch(closeModal());
      setFocus('input[name="body"]');
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.id === 'modal-wrapper') {
      document.removeEventListener('keydown', handleEsc);
      resetForm('modal-rename');
      dispatch(closeModal());
      setFocus('input[name="body"]');
    }
  };
  document.addEventListener('keydown', handleEsc);

  const modalWrapperClasses = cn({
    'modal-wrapper': true,
    show: isOpened,
  });

  return (
    <div
      id='modal-wrapper'
      className={modalWrapperClasses}
      onClick={handleClickOutside}
    >
      <ModalAdd />
      <ModalRename />
      <ModalRemove />
    </div>
  );
};

export default Modals;
