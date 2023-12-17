import { useState } from 'react';
import { useSnackbar } from 'notistack';

import ErrorMessage from '../assets/errorMessages.json';
import { useDataContext } from '../DataContext/useDataContext';

export const useLogin = (
  callback: (email: string, password: string) => Promise<void>
): [(email: string, password: string) => Promise<void>, boolean, string] => {
  const { language } = useDataContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await callback(email, password);
      setIsError('');
    } catch (error) {
      if (error instanceof Error) {
        setIsError(error.message);
        enqueueSnackbar(error.message, { variant: 'error' });
      } else {
        throw new Error(ErrorMessage.ERROR_MESSAGE[language]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [login, isLoading, isError];
};
