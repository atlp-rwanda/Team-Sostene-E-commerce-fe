import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../../redux/store';
import { render, fireEvent, waitFor } from '@testing-library/react';
import WarningDelete from '../components/warningDelete';
import axios from 'axios';
import { setToken } from '../../../redux/slices/tokenSlice';
import { vi } from 'vitest';

describe('Test clear warning popup', () => {
  test('Should render clear cart warning popup', async () => {
    const setIsPopupOpen = vi.fn();
    const handleGetCart = vi.fn();
    store.dispatch(setToken('TOKEN!21'));

    vi.spyOn(axios, 'delete').mockResolvedValueOnce({
      data: { code: 200, message: 'Cart cleared' },
    });

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <WarningDelete setIsPopupOpen={setIsPopupOpen} handleGetCart={handleGetCart} />
        </BrowserRouter>
      </Provider>
    );

    const title = getByText('Are you sure, you want to clear your cart Products?');
    expect(title).toBeInTheDocument();

    const cancelButton = getByText('Cancel');
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);

    const clearButton = getByText('Clear');
    expect(clearButton).toBeInTheDocument();
    fireEvent.click(clearButton);

    expect(getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => expect(axios.delete).toHaveBeenCalled());

    expect(handleGetCart).toHaveBeenCalled();
  });
});
