import { render, screen } from '@testing-library/react';
import OrgParticipant from './OrgParticipant';

test('renders learn react link', () => {
  render(<OrgParticipant />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
