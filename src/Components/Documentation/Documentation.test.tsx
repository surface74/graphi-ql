import { render, screen } from '@testing-library/react';
import Language from '../../enum/language';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DataContextProvider } from '../../DataContext/DataContextProvider';
import { vi } from 'vitest';
import Documentation from './Documentation';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const switchLanguage = vi.fn(() => 'En');

const TestComponent = () => {
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
          <Documentation />
        </Provider>
      </DataContextProvider>
    </BrowserRouter>
  );
};

describe('Documentation', () => {
  afterEach(() => vi.clearAllMocks());

  test('renders Documentation', () => {
    render(<TestComponent />);
    const title = screen.getByText('DOCUMENTATION:');
    expect(title).toBeInTheDocument();
  });
});
