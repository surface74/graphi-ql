import { waitFor } from '@testing-library/react';
import { watchdog } from './watchdog';
import { vi } from 'vitest';

describe('check watchdog', () => {
  test('checking function was called', async () => {
    const checkFn = vi.fn(() => true);
    const falseFn = vi.fn();

    watchdog(checkFn, falseFn, 0.5);

    await waitFor(
      () => {
        expect(checkFn).toHaveBeenCalled();
        expect(falseFn).not.toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });

  test('false-condition function was called', async () => {
    const checkFn = vi.fn(() => false);
    const falseFn = vi.fn();

    watchdog(checkFn, falseFn, 0.5);

    await waitFor(() => expect(falseFn).toHaveBeenCalled(), { timeout: 1000 });
  });
});
