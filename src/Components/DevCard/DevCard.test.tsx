import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { DataContextProvider } from '../../DataContext/DataContextProvider';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import DevCard from './DevCard';
import { useState } from 'react';
import Language from '../../enum/language';

const switchLanguage = vi.fn(() => 'En');
const mockCard = {
  name: 'Valeriia',
  bio: 'My work experience has nothing to do with programming.',
  location: 'Israel, Tel-Aviv',
  imgSrc: 'https://avatars.githubusercontent.com/u/73602864?v=4',
  gitHub: 'https://github.com/MaleryValery',
  contribution: 'Welcome Page, Editor, Handyman',
};

const DevCardTest = () => {
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
          <DevCard props={mockCard} />
        </Provider>
      </DataContextProvider>
    </BrowserRouter>
  );
};

describe('CardList', () => {
  it('should render correct number of cards', () => {
    render(<DevCardTest />);
    expect(screen.getAllByText('Valeriia').length).toEqual(1);
  });
});
