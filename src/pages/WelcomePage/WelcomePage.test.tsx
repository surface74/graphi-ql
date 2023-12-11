import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import WelcomePage from './WelcomePage';

const mockedUsedNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('WelcomePage', () => {
  test('renders welcome message', () => {
    render(<WelcomePage />);
    const welcomeMessage = screen.getByText('Welcome to GraphiQL');
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('renders Rolling Scopes School logo', () => {
    render(<WelcomePage />);
    const logoImg = screen.getByAltText('Rolling Scopes School Logo');
    expect(logoImg).toBeInTheDocument();
  });
});
