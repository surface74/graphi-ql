import { useState } from 'react';
import { useSnackbar } from 'notistack';

import ErrorMessage from '../assets/errorMessages.json';
import { useDataContext } from '../DataContext/useDataContext';

export type ICallback = (email: string, password: string) => Promise<void>;

export const useLogin = (callback: ICallback): [ICallback, boolean, string] => {
  const { language } = useDataContext();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await callback(email, password);
      setErrorMessage('');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        enqueueSnackbar(error.message, { variant: 'error' });
      } else {
        setErrorMessage(ErrorMessage.ERROR_MESSAGE[language]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [login, isLoading, errorMessage];
};
