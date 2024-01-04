import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(getByText(`Up&GoTeam ${currentYear}©`)).toBeInTheDocument();
  });

  it('has correct links', () => {
    const { getByTestId } = render(<Footer />);
    const schoolLink = getByTestId('rs-link');
    expect(schoolLink).toHaveAttribute('href', 'https://rs.school/react/');
    const githubLink = getByTestId('github-link');
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/MakaevaElena/graphiql-app'
    );
  });
});
