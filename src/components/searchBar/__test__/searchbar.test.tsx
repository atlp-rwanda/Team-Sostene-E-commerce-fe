import { fireEvent, render } from '@testing-library/react';
import SearchBar from '../SearchBar';
import { BrowserRouter } from 'react-router-dom';

describe('Testing Search Bar', () => {
  test('Testing Render', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );
    fireEvent.change(getByTestId('search_text'), { target: { value: '' } });
    fireEvent.click(getByTestId('search_btn'));
    fireEvent.change(getByTestId('search_text'), { target: { value: 'Search this' } });
    fireEvent.click(getByTestId('search_btn'));
    expect(getByPlaceholderText('What are you looking for?')).toBeInTheDocument();
  });
});
