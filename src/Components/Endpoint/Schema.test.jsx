import { render, screen, fireEvent } from '@testing-library/react';
import Language from '../../enum/language';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DataContextProvider } from '../../DataContext/DataContextProvider';
import { vi } from 'vitest';
import Endpoint from './Endpoint';
import { store } from '../../store/store';
import { Provider } from 'react-redux';

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
          <Endpoint />
        </Provider>
      </DataContextProvider>
    </BrowserRouter>
  );
};

describe('Loading Schema', () => {
  afterEach(() => vi.clearAllMocks());

  test('renders button DOCS after click update schema', async () => {
    render(<TestComponent />);

    const submitButton = screen.getByRole('submitButton');
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);

    const docsButton = await screen.findByText('DOCS');
    expect(docsButton).toBeInTheDocument();
  });
});
