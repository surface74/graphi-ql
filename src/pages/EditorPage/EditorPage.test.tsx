import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import EditorPage from './EditorPage';
import { store } from '../../store/store';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Language from '../../enum/language';
import { DataContextProvider } from '../../DataContext/DataContextProvider';

vi.mock('@mui/material/useMediaQuery');

const switchLanguage = vi.fn(() => 'En');

const EditorPageTest = () => {
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
          <EditorPage />
        </Provider>
      </DataContextProvider>
    </BrowserRouter>
  );
};

describe('EditorPage', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<EditorPageTest />);
    expect(getByText('GraphiQL')).toBeInTheDocument();
  });

  it('renders main components', () => {
    render(<EditorPageTest />);

    const submitBtn = screen.getByTestId('submit-btn');
    expect(screen.getByTestId('endpoint')).toBeInTheDocument();
    expect(screen.getByTestId('request-editor')).toBeInTheDocument();
    expect(screen.getByTestId('response-section')).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    fireEvent.click(submitBtn);
  });
});
