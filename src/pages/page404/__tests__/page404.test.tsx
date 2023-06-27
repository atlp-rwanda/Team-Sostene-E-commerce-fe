import { render, fireEvent } from '@testing-library/react';
import Page404 from '../page404';
import { MemoryRouter } from 'react-router-dom';

describe('Page404', () => {
  test('should navigate back when the "Back" button is clicked', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['*']}>
        <Page404 />
      </MemoryRouter>
    );
    expect(getByText('Back')).toBeInTheDocument();
    expect(
      getByText('Missed what you are looking for? Don’t worry! You can try again with another way!')
    ).toBeInTheDocument();
    fireEvent.click(getByText('Back'));
  });
});
