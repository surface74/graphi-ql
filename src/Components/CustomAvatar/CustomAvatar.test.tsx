import { render, screen } from '@testing-library/react';
import CustomAvatar from './CustomAvatar';

describe('CustomAvatar', () => {
  test('renders correct components', () => {
    const USER_NAME = 'fake@user.mail';

    render(<CustomAvatar userName={USER_NAME} />);

    const title = screen.getByText(USER_NAME.slice(0, 2).toLocaleUpperCase());
    expect(title).toBeInTheDocument();
  });
});
