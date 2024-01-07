import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import ErrorMessages from '../assets/errorMessages.json';
import Language from '../enum/language';

export const parseQueryError = (
  error: FetchBaseQueryError | SerializedError,
  language: Language
): string => {
  let errorMessage = '';
  if (Object.hasOwn(error, 'status')) {
    const status = (error as FetchBaseQueryError).status;
    errorMessage =
      typeof status === 'number'
        ? `${ErrorMessages.HTTP_STATUS_CODE[language]}: ${status}`
        : `${ErrorMessages.ERROR_FETCH_DATA[language]}: ${status}`;
  } else {
    const serializedError = error as SerializedError;
    const status = `${serializedError?.code}: ${serializedError?.message}`;
    errorMessage = `${ErrorMessages.ERROR_FETCH_DATA[language]}: ${status}`;
  }

  return errorMessage;
};
