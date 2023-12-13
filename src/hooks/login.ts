import { Auth } from 'firebase/auth';
import { useState } from 'react';
import ErrorMessage from '../assets/errorMessages.json';

export const useLogin = (
  callback: (auth: Auth, email: string, password: string) => Promise<void>
): [
  (auth: Auth, email: string, password: string) => Promise<void>,
  boolean,
  string,
] => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  const login = async (auth: Auth, email: string, password: string) => {
    try {
      setIsLoading(true);
      await callback(auth, email, password);
      setIsError('');
    } catch (error) {
      if (error instanceof Error) {
        setIsError(error.message);
      } else {
        throw new Error(ErrorMessage.ERROR_MESSAGE.En);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [login, isLoading, isError];
};
