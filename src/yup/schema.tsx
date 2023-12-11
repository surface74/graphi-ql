import * as yup from 'yup';
import errorMessages from '../assets/errorMessages.json';

const CHECK_NAME = /^[A-ZА-Я][a-zа-я]*$/;
const CHECK_EMAIL = /[a-z0-9]+[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/;
const CHECK_PASSWORD =
  /(?=(.*[0-9]))(?=.*[@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;

export const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .matches(CHECK_NAME)
      .test('name length', errorMessages.CHECK_NAME_LENGTH.En, (name) => {
        if (name) return name?.length > 2;
      })
      .required('required'),
    email: yup
      .string()
      .email(errorMessages.CHECK_EMAIL_FORMAT.En)
      .matches(CHECK_EMAIL)
      .required(errorMessages.CHECK_EMAIL_REQUIRED.En),
    password: yup
      .string()
      .test(
        'is strong password',
        errorMessages.CHECK_PASSWORD_STRONG.En,
        (password) => {
          if (password) return password?.length > 8;
        }
      )
      .test(
        'password format',
        errorMessages.CHECK_PASSWORD_FORMAT.En,
        (password) => {
          if (password) return CHECK_PASSWORD.test(password);
        }
      )
      .defined()
      .required(errorMessages.CHECK_PASSWORD_REQUIRED),
    passwordRepeat: yup
      .string()
      .oneOf([yup.ref('password')], errorMessages.CHECK_PASSWORD_MATCH)
      .required(errorMessages.CHECK_PASSWORD_REQUIRED),
  })
  .required();
