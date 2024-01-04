import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { ICallback, useLogin } from './login';
import { DataContextProvider } from '../DataContext/DataContextProvider';
import { FC, useEffect, useState } from 'react';
import Language from '../enum/language';

interface ITestComponentProps {
  fn: ICallback;
}

const TestComponent: FC<ITestComponentProps> = ({ fn }) => {
  const [login] = useLogin(fn);

  useEffect(() => {
    const callLogin = async () => {
      await login('', '');
    };
    callLogin().catch(() => {});
  }, [login]);

  return null;
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
  test('calling hooked method', () => {
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
});
