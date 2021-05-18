import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { setFocus } from '../../utilities';

const SingInPage = () => {
  const auth = useAuth();
  const errors = {};

  useEffect(() => {
    setFocus('input[name="username"]');
  });

  return (
    <div className='login-form'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const message = values;
          try {
            const response = await axios({
              method: 'post',
              url: '/api/v1/login',
              data: message,
              timeout: 4000,
            });
            localStorage.username = response.data.username;
            localStorage.token = response.data.token;
            auth.signin();
          } catch (e) {
            errors.signin = e.message;
            setSubmitting(false);
            setFocus('input[name="username"]');
            throw e;
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor='username'>Ваш ник</label>
            <Field
              id='username'
              type='text'
              name='username'
              className={errors.hasOwnProperty('signin') ? 'is-invalid' : ''}
              readOnly={isSubmitting}
              required
            />
            <label htmlFor='password'>Пароль</label>
            <Field
              id='password'
              type='password'
              name='password'
              className={errors.hasOwnProperty('signin') ? 'is-invalid' : ''}
              readOnly={isSubmitting}
              required
            />
            <div className='login-feedback'>
              {errors.signin === 'Request failed with status code 401'
                ? 'Неверные имя пользователя или пароль'
                : null}
            </div>
            <button type='submit' disabled={isSubmitting}>
              Войти
            </button>

            <p>Нет аккаунта?</p>
            <a href='/signup'>Регистрация</a>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SingInPage;
