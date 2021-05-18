import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { setFocus } from '../../utilities';

const SingUpPage = () => {
  const auth = useAuth();
  const error = {};

  useEffect(() => {
    setFocus('input[name="username"]');
  });

  const validate = (values) => {
    const errors = {};
    if (values.passwordConfirm !== values.password) {
      errors.passwordConfirm = 'Пароли не совпадают';
    }
    return errors;
  };

  return (
    <div className='login-form'>
      <Formik
        initialValues={{ username: '', password: '', passwordConfirm: '' }}
        validateOnBlur={false}
        validate={validate}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const message = values;
          try {
            const response = await axios({
              method: 'post',
              url: '/api/v1/signup',
              data: message,
              timeout: 4000,
            });
            localStorage.username = response.data.username;
            localStorage.token = response.data.token;
            auth.signin();
          } catch (e) {
            errors.signup = e.message;
            setSubmitting(false);
            setFocus('input[name="username"]');
            throw e;
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <label htmlFor='username'>Имя пользователя</label>
            <Field
              id='username'
              type='text'
              name='username'
              className={error.hasOwnProperty('signup') ? 'is-invalid' : ''}
              readOnly={isSubmitting}
              required
            />
            <label htmlFor='password'>Пароль</label>
            <Field
              id='password'
              type='password'
              name='password'
              className={error.hasOwnProperty('signup') ? 'is-invalid' : ''}
              readOnly={isSubmitting}
              required
            />
            <label htmlFor='passwordConfirm'>Подтвердите пароль</label>
            <Field
              id='passwordConfirm'
              type='password'
              name='passwordConfirm'
              className={error.hasOwnProperty('signup') ? 'is-invalid' : ''}
              readOnly={isSubmitting}
              required
            />
            <div className='login-feedback'>
              {error.signup === 'Request failed with status code 401'
                ? 'Неверные имя пользователя или пароль'
                : null}
              {errors.passwordConfirm && touched.passwordConfirm
                ? `${errors.passwordConfirm}`
                : null}
            </div>
            <button type='submit' disabled={isSubmitting}>
              Зарегистрироваться
            </button>

            <p>Есть аккаунта?</p>
            <a href='/signin'>Войти</a>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SingUpPage;
