import { fireEvent, render, screen } from '@testing-library/react';
import Language from '../../enum/language';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DataContextProvider } from '../../DataContext/DataContextProvider';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import DocsSection from './DocsSection';
import mockData from './mocks/mockSchemaData.json';
import { Type } from '../../common-types/schema.types';

const switchLanguage = vi.fn(() => 'En');

const TestComponent = () => {
  const [language] = useState(Language.En);

  const types = mockData.data.__schema.types as unknown as Type[];

  return (
    <BrowserRouter>
      <DataContextProvider
        value={{
          language,
          setLanguage: switchLanguage,
        }}
      >
        <Provider store={store}>
          {types ? <DocsSection heading={'QUERIES:'} types={types} /> : null}
        </Provider>
      </DataContextProvider>
    </BrowserRouter>
  );
};

describe('Documentation', () => {
  afterEach(() => vi.clearAllMocks());

  test('open DocsSection', () => {
    render(<TestComponent />);
    const titleQueries = screen.getByText('QUERIES:');
    expect(titleQueries).toBeInTheDocument();

    const point = screen.getByText('character(...): Character');
    expect(point).toBeInTheDocument();
  });

  test('open SubSection', async () => {
    render(<TestComponent />);
    const point = screen.getByText('character(...): Character');
    expect(point).toBeInTheDocument();

    let subSectionDescription = screen.queryByText(
      'Get a specific character by ID'
    );
    expect(subSectionDescription).not.toBeInTheDocument();

    let subSectionArguments = screen.queryByText('ARGUMENTS');
    expect(subSectionArguments).not.toBeInTheDocument();

    let subSectionDetails = screen.queryByText('name: String');
    expect(subSectionDetails).not.toBeInTheDocument();

    fireEvent.click(point);

    subSectionDescription = await screen.findByText(
      'Get a specific character by ID'
    );
    expect(subSectionDescription).toBeInTheDocument();

    subSectionArguments = await screen.findByText('ARGUMENTS');
    expect(subSectionArguments).toBeInTheDocument();

    subSectionDetails = await screen.findByText('name: String');
    expect(subSectionDetails).toBeInTheDocument();
  });
});
