import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { it, vi } from 'vitest';
import Header from './Header';
import { store } from '../../store/store';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import Language from '../../enum/language';
import { DataContextProvider } from '../../DataContext/DataContextProvider';

const mockedUsedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const router: object = await vi.importActual('react-router-dom');
  return {
    ...router,
    useNavigate: () => mockedUsedNavigate,
    useLocation: () => ({
      pathname: '/',
    }),
  };
});

vi.mock('../../hooks/auth', () => ({
  useAuth: () => ({
    isLogin: true,
  }),
}));

vi.mock('../Authority/firebase.ts', () => ({
  logOut: vi.fn(),
}));

vi.mock('../../store/slices/apiSlice.ts', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    setBaseUrl: vi.fn(),
  };
});

vi.mock('../../hooks/store.ts', () => ({
  useAppSelector: () => ({
    user: {
      user: {
        email: 'test@example.com',
      },
    },
  }),
}));

const switchLanguage = vi.fn(() => 'En');

const HeaderTest = () => {
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
          <Header />
        </Provider>
      </DataContextProvider>
    </BrowserRouter>
  );
};

describe('Header', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<HeaderTest />);
    expect(getByTestId('main-heading')).toBeInTheDocument();
  });

  it('changes language when switch is clicked', () => {
    const { getByRole } = render(<HeaderTest />);
    const switchButton = getByRole('checkbox');
    fireEvent.click(switchButton);
  });
});
