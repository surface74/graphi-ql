import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import errorMessages from '../../assets/errorMessages.json';

describe('ErrorBoundler: ', () => {
  test('- test error message render', () => {
    const ThrowError = () => {
      throw new Error();
    };

    render(
      <ErrorBoundary fallback={<h1>{errorMessages.ERROR_MESSAGE.En}</h1>}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole('heading', { name: errorMessages.ERROR_MESSAGE.En })
    ).toBeDefined();
  });
});
