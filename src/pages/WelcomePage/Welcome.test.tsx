import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { it, vi } from 'vitest';
import WelcomePage from './WelcomePage';
import { DataContextProvider } from '../../DataContext/DataContextProvider';
import { useState } from 'react';
import Language from '../../enum/language';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const router: object = await vi.importActual('react-router-dom');
  return {
    ...router,
    useNavigate: () => mockedUsedNavigate,
  };
});

const switchLanguage = vi.fn(() => 'En');

const WelcomePageTest = () => {
  const [language] = useState(Language.En);

  return (
    <BrowserRouter>
      <DataContextProvider
        value={{
          language,
          setLanguage: switchLanguage,
        }}
      >
        <Provider store={store}>
          <WelcomePage />
        </Provider>
      </DataContextProvider>
    </BrowserRouter>
  );
};

describe('WelcomePage', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<WelcomePageTest />);
    expect(getByTestId('sign-in')).toBeInTheDocument();
    expect(getByTestId('welcome-heading')).toBeInTheDocument();
    expect(getByTestId('welcome-title')).toBeInTheDocument();
  });

  it('navigates to sign in page when sign in button is clicked', () => {
    const { getByTestId } = render(<WelcomePageTest />);
    fireEvent.click(getByTestId('sign-in'));
  });

  it('navigates to sign up page when sign up button is clicked', () => {
    const { getByTestId } = render(<WelcomePageTest />);
    fireEvent.click(getByTestId('sign-up'));
  });
});
