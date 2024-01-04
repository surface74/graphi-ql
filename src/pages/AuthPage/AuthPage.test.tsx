import { render, screen } from '@testing-library/react';
import Language from '../../enum/language';
import { FC, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DataContextProvider } from '../../DataContext/DataContextProvider';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { AuthActionType } from './AuthPage.types';
import AuthPage from './AuthPage';
import UIStrings from '../../assets/UIStrings.json';

interface ITestCOmponentProps {
  startLanguage: Language;
  action: AuthActionType;
}

const TestComponent: FC<ITestCOmponentProps> = ({ startLanguage, action }) => {
  const [language, setLanguage] = useState(startLanguage);

  const switchLanguage = (language: Language) => {
    setLanguage(language);
  };

  return (
    <BrowserRouter>
      <DataContextProvider
        value={{
          language,
          setLanguage: switchLanguage,
        }}
      >
        <Provider store={store}>
          <AuthPage authActionType={action} />
        </Provider>
      </DataContextProvider>
    </BrowserRouter>
  );
};

describe('AuthPage', () => {
  test('renders correct components for LogIn in locale En', () => {
    const language = Language.En;
    const authType = AuthActionType.LOGIN;
    render(<TestComponent startLanguage={language} action={authType} />);

    const title = screen.getByRole('heading', {
      name: UIStrings.SignInPageTitle[language],
    });
    expect(title).toBeInTheDocument();
  });
  test('renders correct components for LogIn in locale Ru', () => {
    const language = Language.Ru;
    const authType = AuthActionType.SIGNUP;
    render(<TestComponent startLanguage={language} action={authType} />);

    const title = screen.getByRole('heading', {
      name: UIStrings.SignUpPageTitle[language],
    });
    expect(title).toBeInTheDocument();
  });
});
