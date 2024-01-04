import { MemoryRouter } from 'react-router-dom';
import { DataContextProvider } from '../../DataContext/DataContextProvider';
import { render, screen } from '@testing-library/react';
import errorMessages from '../../assets/errorMessages.json';
import App from '../../Components/App/App';
import Language from '../../enum/language';
import { useState } from 'react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const switchLanguage = vi.fn(() => 'En');

const TestComponent = () => {
  const [language] = useState(Language.En);

  return (
    <MemoryRouter initialEntries={['/this-route-does-not-exist']}>
      <DataContextProvider
        value={{
          language,
          setLanguage: switchLanguage,
        }}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </DataContextProvider>
    </MemoryRouter>
  );
};

describe('NotFoundPage', () => {
  afterEach(() => vi.clearAllMocks());

  test('Renders not found if invalid path', () => {
    render(<TestComponent />);

    expect(screen.getByText(errorMessages.ERROR_404.En)).toBeDefined();
  });
});
