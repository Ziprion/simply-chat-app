import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
  const channels = getChannels();

  const validate = (value) => {
    const channelsName = channels.map((channel) => channel.name);

    if (!value) {
      return 'Required';
    }

    if (value.length < 3 || value.length > 20) {
      return 'Must be 3 to 20 characters';
    }

    if (channelsName.includes(value)) {
      return 'Must be unique';
    }

    return '';
  };

  return !currentStatus ? null : (
    <div className={currentStatus ? 'modal show' : null}>
      <h3>Добавить чат</h3>
      <Formik
        initialValues={{ 'channel-name': '' }}
        validateOnBlur={false}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const message = {
            name: values['channel-name'],
          };
          try {
            socket.emit('newChannel', message, ({ data }) => {
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
