import { fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import store from '../../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import DeleteAcollection from '../deleteCollection';
import { toast } from 'react-toastify';

vi.mock('axios');
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe('Testing Delete collection', () => {
  beforeEach(() => {
    const mockDispatch = vi.fn();
    store.dispatch = mockDispatch;
  });
  const setIsPopupOpen = vi.fn();
  const deleteCollectionId = '123ed';
  const collectionName = 'collection';
  const Mockcontainer = () => {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <DeleteAcollection
            setIsPopupOpen={setIsPopupOpen}
            deleteCollectionId={deleteCollectionId}
            collectionName={collectionName}
          />
        </Provider>
      </BrowserRouter>
    );
  };
  test('No action when  delete is canceled', () => {
    const axiosMock = vi.spyOn(axios, 'delete').mockResolvedValueOnce({
      data: {
        message: 'It worked!',
      },
    });
    const { getByText, getByRole } = render(<Mockcontainer />);

    const text = getByText('Are you sure, you want to delete this collection?');
    expect(text).toBeInTheDocument();
    const collectionInput = getByRole('cancel');
    expect(collectionInput).toBeInTheDocument();
    fireEvent.click(collectionInput);
    expect(axiosMock).not.toBeCalled();
  });

  test('delete a collection successfully', async () => {
    const axiosMock = vi.spyOn(axios, 'delete').mockResolvedValueOnce({
      data: {
        message: 'It worked!',
      },
    });
    const { getByText, getByRole } = render(<Mockcontainer />);

    const text = getByText(
      'Note that, This action can not be undone! Deleting your collection will erase all products added to this collection.'
    );
    expect(text).toBeInTheDocument();
    const deletebtn = getByRole('deleteBtn');
    expect(deletebtn).toBeInTheDocument();
    fireEvent.click(deletebtn);
    expect(getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(axiosMock).toBeCalled();
      expect(store.dispatch).toBeCalled();
    });

    expect(toast.success).toHaveBeenCalledWith(
      `Collection ${collectionName} has been deleted Successfully!`
    );
  });
});
