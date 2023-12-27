import * as yup from 'yup';
import errorMessages from '../assets/errorMessages.json';
import ValidationRule from '../common-types/validation-rule';
import Language from '../enum/language';

export const endpointSchema = (language: Language) => {
  return yup
    .object()
    .shape({
      baseUrl: yup
        .string()
        .required(errorMessages.CHECK_BASE_URL_REQUIRED[language])
        .matches(
          ValidationRule.BASE_URL,
          errorMessages.CHECK_BASE_URL_FORMAT[language]
        ),
    })
    .required();
};
