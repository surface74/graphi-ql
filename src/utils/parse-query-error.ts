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
    const baseQueryError = error as FetchBaseQueryError;
    const status = baseQueryError.status;
    errorMessage =
      typeof status === 'number'
        ? parseStatus(baseQueryError.data as BaseErrors)
        : baseQueryError.error;
  } else {
    const serializedError = error as SerializedError;
    errorMessage = `${serializedError?.code || ''}: ${
      serializedError?.message || ''
    }`;
  }
  return `${ErrorMessages.ERROR_FETCH_DATA[language]}: ${errorMessage}`;
};

const parseStatus = (data: BaseErrors): string => {
  return data?.errors[0].message || '';
};

type BaseErrors = {
  errors: BaseError[];
};

type BaseError = {
  message: string;
};
