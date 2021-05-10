import React, { useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../redux/reducer.js';
import { Formik, Form, Field } from 'formik';
import { setFocus } from '../../../utilities';

const ModalAdd = () => {
  useEffect(() => {
    setFocus('input[name="channel-name"]');
  });
  const dispatch = useDispatch();
  const currentStatus = useSelector((state) => state.modalInfo.isOpened);

  const handleCloseModal = () => (e) => {
    if (e.target.id === 'modal-wrapper') {
      dispatch(closeModal());
    }
  };

  const modalWrapperClasses = cn({
    'modal-wrapper': true,
    show: currentStatus,
  });

  const modalClasses = cn({
    modal: true,
    show: currentStatus,
  });
  const errors = {};
  return (
    <div
      id='modal-wrapper'
      className={modalWrapperClasses}
      onClick={handleCloseModal()}
    >
      <div className={modalClasses}>
        <h3>Добавить чат</h3>
        <Formik
          initialValues={{ 'channel-name': '' }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            const message = values;

            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                id='channel-name'
                type='text'
                name='channel-name'
                readOnly={isSubmitting}
                required
              />
              <button type='submit' disabled={isSubmitting}>
                Добавить
              </button>
              <button type='submit' disabled={isSubmitting}>
                Отменить
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ModalAdd;
