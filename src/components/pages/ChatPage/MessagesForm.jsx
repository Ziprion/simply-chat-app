import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import routes from '../../../routes.js';
import { setFocus } from '../../../utilities';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from '../../../socket.js';

const MessagesForm = () => {
  const errors = {};
  const username = localStorage.username;
  const currentChannelId = useSelector(
    (state) => state.channelsInfo.currentChannelId
  );
  useEffect(() => {
    setFocus('input[name="body"]');
  });

  return (
    <div className='messages-form'>
      <Formik
        initialValues={{ body: '' }}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          setSubmitting(true);
          const message = {
            channelId: currentChannelId,
            username,
            ...values,
          };
          try {
            socket.emit('newMessage', { message }, () => {});
            resetForm();
          } catch (e) {
            errors.message = e.message;
            throw e;
          }
          setFocus('input[name="body"]');
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              id='body'
              type='text'
              name='body'
              className={errors.hasOwnProperty('message') ? 'is-invalid' : ''}
              readOnly={isSubmitting}
              placeholder='Напишите сообщение...'
              required
            />
            <div className='message-feedback'>
              {errors.message === 'Request failed with status code 401'
                ? 'Неверные имя пользователя или пароль'
                : null}
            </div>
            <button type='submit' disabled={isSubmitting}></button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessagesForm;
