import { render, screen } from '@testing-library/react';
import Language from '../../enum/language';
import { FC, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DataContextProvider } from '../../DataContext/DataContextProvider';
import ErrorMessage from './ErrorMessage';
import Strings from '../../assets/errorMessages.json';

interface ITestComponentProps {
  initLanguage: Language;
}

const TestComponent: FC<ITestComponentProps> = ({ initLanguage }) => {
  const [language, setLanguage] = useState(initLanguage);

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
        <ErrorMessage />
      </DataContextProvider>
    </BrowserRouter>
  );
};

describe('ErrorMessage', () => {
  test('renders correct text En', () => {
    const language = Language.En;
    render(<TestComponent initLanguage={language} />);

    const title = screen.getByText(Strings.ERROR_MESSAGE[language]);
    expect(title).toBeInTheDocument();
  });

  test('renders correct text Ru', () => {
    const language = Language.Ru;
    render(<TestComponent initLanguage={language} />);

    const title = screen.getByText(Strings.ERROR_MESSAGE[language]);
    expect(title).toBeInTheDocument();
  });
});
