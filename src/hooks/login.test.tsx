import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ICallback, useLogin } from './login';
import { DataContextProvider } from '../DataContext/DataContextProvider';
import { FC, useEffect, useState } from 'react';
import Language from '../enum/language';

interface ITestComponentProps {
  fn: ICallback;
}

const TestComponent: FC<ITestComponentProps> = ({ fn }) => {
  const [login, , errorMessage] = useLogin(fn);

  useEffect(() => {
    const callLogin = async () => {
      await login('', '');
    };
    callLogin().catch(() => {});
  }, [login]);

  return <h1>{errorMessage}</h1>;
};

interface IWrapperComponentProps {
  children: JSX.Element;
}

const WrapperComponent: FC<IWrapperComponentProps> = ({ children }) => {
  const [language, setLanguage] = useState(Language.En);

  const switchLanguage = (language: Language) => {
    setLanguage(language);
  };
  return (
    <DataContextProvider
      value={{
        language,
        setLanguage: switchLanguage,
      }}
    >
      {children}
    </DataContextProvider>
  );
};

describe('Hook useLogin()', () => {
  test('call hooked method', () => {
    const fakeFetch: ICallback = () => {
      return Promise.resolve();
    };

    const fn = vi.fn(fakeFetch);

    render(
      <WrapperComponent>
        <TestComponent fn={fn} />
      </WrapperComponent>
    );

    expect(fn).toHaveBeenCalled();
  });

  test('call hooked method throw error', () => {
    const ERROR_TEXT = 'Boom!';
    const fakeFetch: ICallback = () => {
      throw new Error(ERROR_TEXT);
      return Promise.resolve();
    };

    const fn = vi.fn(fakeFetch);

    render(
      <WrapperComponent>
        <TestComponent fn={fn} />
      </WrapperComponent>
    );

    const error = screen.getByRole('heading', { name: ERROR_TEXT });
    expect(error).toBeInTheDocument();
  });
});
