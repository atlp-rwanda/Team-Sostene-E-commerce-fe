import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DeleteProduct from './main';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import * as hooks from './hooks/erase';
import { vi } from 'vitest';
import { toast } from 'react-toastify';

vi.mock('./hooks/erase', () => ({
  useProductDelete: vi.fn(),
}));

describe('testin delete button', function () {
  it('should test the rendering of the component', function () {
    vi.spyOn(hooks, 'useProductDelete').mockReturnValue({
      response: null,
      loading: false,
      error: null,
      deleteProduct: vi.fn(),
    });
    render(
      <Provider store={store}>
        <DeleteProduct cid={''} pid={''} status={vi.fn()} />
      </Provider>
    );
    const image = screen.getByTestId('delete_image');
    fireEvent.click(image);
    expect(screen.getByText('Confirm Delete')).toBeInTheDocument();
  });
  it('should test the rendering of the model div (closing)', async function () {
    vi.spyOn(hooks, 'useProductDelete').mockReturnValue({
      response: null,
      loading: false,
      error: null,
      deleteProduct: vi.fn(),
    });
    render(
      <Provider store={store}>
        <DeleteProduct cid={''} pid={''} status={vi.fn()} />
      </Provider>
    );
    const image = screen.getByTestId('delete_image');
    fireEvent.click(image);
    const cancel = screen.getByText('Delete');
    fireEvent.click(cancel);
    await waitFor(() => {
      expect(screen.queryByText('Confirm Delete')).toBe(null);
    });
  });

  it('should test the rendering of the toast error', async function () {
    const response = {
      response: {
        data: {
          code: 400,
          message: 'Anouthorized',
        },
      },
    };
    vi.spyOn(hooks, 'useProductDelete').mockReturnValue({
      response: null,
      loading: false,
      error: response,
      deleteProduct: vi.fn(),
    });
    const errorSpy = vi.spyOn(toast, 'error');
    render(
      <Provider store={store}>
        <DeleteProduct cid={''} pid={''} status={vi.fn()} />
      </Provider>
    );
    const image = screen.getByTestId('delete_image');
    fireEvent.click(image);
    const cancel = screen.getByText('Delete');
    fireEvent.click(cancel);
    expect(errorSpy).toBeCalled;
  });

  it('should test the rendering of the loading component', async function () {
    vi.spyOn(hooks, 'useProductDelete').mockReturnValue({
      response: null,
      loading: true,
      error: null,
      deleteProduct: vi.fn(),
    });
    render(
      <Provider store={store}>
        <DeleteProduct cid={''} pid={''} status={vi.fn()} />
      </Provider>
    );
    expect(screen.getByTestId('button-loader')).toBeInTheDocument();
  });
});
