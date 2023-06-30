import { fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import store from '../../../../redux/store';
import { Main } from '../../Dashboard';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('Testing Main collections components', () => {
  test(' get Main page', async () => {
    const axiosMock = vi.spyOn(axios, 'get').mockResolvedValueOnce({
      data: {
        data: [
          {
            id: '12345dd',
            name: 'collectionss',
          },
        ],
      },
    });
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    );

    const name = getByText('Create Collection');
    const addProduct = getByRole('addProductsCollection');
    expect(name).toBeInTheDocument();
    expect(addProduct).toBeInTheDocument();
    await waitFor(() => {
      fireEvent.click(addProduct);
      expect(toast.error).toHaveBeenCalledWith(
        `No collection available! Create a collection first!`
      );
    });
    expect(axiosMock).toBeCalled();
    fireEvent.click(addProduct);
    await waitFor(() => {
      expect(getByText('Choose a collection')).toBeInTheDocument();
      const closeBtn = getByRole('closePopup');
      expect(closeBtn).toBeInTheDocument();
      fireEvent.click(closeBtn);
      expect(name).toBeInTheDocument();
    });
  });
});
