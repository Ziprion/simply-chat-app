import React, { useEffect } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, switchChannel } from '../../../redux/reducer.js';
import { Formik, Form, Field } from 'formik';
import { setFocus, getCurrentModal, getChannels } from '../../../utilities';
import { socket } from '../../../socket.js';

const ModalAdd = () => {
  useEffect(() => {
    setFocus('input[name="channel-name"]');
  });

  const dispatch = useDispatch();
  const currentStatus = getCurrentModal() === 'add';
  const currentChannels = getChannels();

  const validate = (value) => {
    if (!value) {
      return 'Required';
    }
    if (value.length < 3 || value.length > 20) {
      return 'Must be 3 to 20 characters';
    }
    const channelsName = currentChannels.map((channel) => channel.name);
    const isSameName = channelsName.includes(value);
    if (isSameName) {
      return 'Must be unique';
    }
    return '';
  };

  const modalClasses = cn({
    modal: true,
    show: currentStatus,
  });

  return !currentStatus ? null : (
    <div className={modalClasses}>
      <h3>Добавить чат</h3>
      <Formik
        initialValues={{ 'channel-name': '' }}
        validateOnBlur={false}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          setSubmitting(true);
          const message = {
            name: values['channel-name'],
          };
          try {
            socket.emit('newChannel', message, ({ data }) => {
              resetForm();
              dispatch(closeModal());
              const channels = document.querySelector('.channels');
              channels.scrollTop = channels.scrollHeight;
              dispatch(switchChannel(data.id));
            });
          } catch (e) {
            console.log(e.message);
            setFocus('input[name="channel-name"]');
            throw e;
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form id='modal-add' noValidate={true}>
            <Field
              id='channel-name'
              type='text'
              name='channel-name'
              validate={validate}
              readOnly={isSubmitting}
            />
            {errors['channel-name'] && touched['channel-name']
              ? `${errors['channel-name']}`
              : null}

            <button type='submit' disabled={isSubmitting}>
              Добавить
            </button>
            <button type='button' disabled={isSubmitting}>
              Отменить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ModalAdd;
