import React, { useEffect } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/reducer.js';
import { Formik, Form, Field } from 'formik';
import {
  setFocus,
  getCurrentModal,
  getExtraId,
  getChannels,
  getChannelById,
} from '../../../utilities';
import { socket } from '../../../socket.js';

const ModalRename = () => {
  const dispatch = useDispatch();
  const currentStatus = getCurrentModal() === 'rename';
  const extraId = getExtraId();
  const channels = getChannels();
  const extraChannel = getChannelById(extraId);

  useEffect(() => {
    setFocus('input[name="channel-rename"]');
  });

  const validate = (value) => {
    if (!value) {
      return 'Required';
    }
    if (value.length < 3 || value.length > 20) {
      return 'Must be 3 to 20 characters';
    }
    const channelsName = channels.map((channel) => channel.name);
    const isSameName = channelsName.includes(value);
    if (isSameName) {
      return 'Current name';
    }
    return '';
  };

  const modalClasses = cn({
    modal: true,
    show: currentStatus,
  });

  return !currentStatus ? null : (
    <div className={modalClasses}>
      <h3>Rename чат</h3>
      <Formik
        initialValues={{
          'channel-rename': `${extraChannel.name}`,
        }}
        validateOnBlur={false}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const message = {
            id: extraId,
            name: values['channel-rename'],
          };
          try {
            socket.emit('renameChannel', message, () => {
              dispatch(closeModal());
              setFocus('input[name="body"]');
            });
          } catch (e) {
            console.log(e.message);
            setFocus('input[name="channel-rename"]');
            throw e;
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form id='modal-rename' noValidate={true}>
            <Field
              id='channel-rename'
              type='text'
              name='channel-rename'
              validate={validate}
              readOnly={isSubmitting}
            />
            {errors['channel-rename'] && touched['channel-rename']
              ? `${errors['channel-rename']}`
              : null}

            <button type='submit' disabled={isSubmitting}>
              Rename
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

export default ModalRename;
