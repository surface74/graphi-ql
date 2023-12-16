import * as yup from 'yup';
import errorMessages from '../assets/errorMessages.json';
import ValidationRule from '../common-types/validation-rule';
import Language from '../enum/language';

export const getSchema = (language: Language) => {
  return yup
    .object()
    .shape({
      email: yup
        .string()
        .required(errorMessages.CHECK_EMAIL_REQUIRED[language])
        .email(errorMessages.CHECK_EMAIL_FORMAT[language])
        .matches(
          ValidationRule.EMAIL,
          errorMessages.CHECK_EMAIL_FORMAT[language]
        ),
      password: yup
        .string()
        .required(errorMessages.CHECK_PASSWORD_REQUIRED[language])
        .min(8, errorMessages.CHECK_PASSWORD_LENGHT[language])
        .matches(
          ValidationRule.PASSWORD_UNICODE,
          errorMessages.CHECK_PASSWORD_FORMAT[language]
        ),
    })
    .required();
};
