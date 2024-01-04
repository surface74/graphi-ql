import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import errorMessages from '../../assets/errorMessages.json';

describe('ErrorBoundler: ', () => {
  test('- test error message render', () => {
    const ThrowError = () => {
      throw new Error('test');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(errorMessages.ERROR_MESSAGE.En)).toBeDefined();
  });
});
