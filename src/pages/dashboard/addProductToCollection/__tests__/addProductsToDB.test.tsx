import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { test, vi } from 'vitest';
import { Provider } from 'react-redux';
import AddProductToCollection from '../addProductToCollection';
import store from '../../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { initialStateProductInterface } from '../addProduct.slice';
import userEvent from '@testing-library/user-event';

vi.mock('axios');
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe('AddProductToCollection', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AddProductToCollection />
        </BrowserRouter>
      </Provider>
    );
  });

  test('renders the AddProductToCollection Component and pops up validation schema', async () => {
    expect(screen.getByText('When will your product expire?')).toBeInTheDocument();
    expect(screen.getByText('Describe your product in more that 50 words')).toBeInTheDocument();
    expect(screen.getByText('View Collection')).toBeInTheDocument();
    const submitBtnx = screen.getByText('Submit');
    fireEvent.click(submitBtnx);
    await waitFor(() => {
      expect(screen.getByText('Product name is required')).toBeInTheDocument();
      expect(screen.getByText('Category is required')).toBeInTheDocument();
      expect(
        screen.getByText('Product description is to required, with minimun of 50 words')
      ).toBeInTheDocument();
      expect(screen.getByText('Please select at least 4 images')).toBeInTheDocument();
    });
  });

  test('renders the AddProductToCollection Component and Sumbite data', async () => {
    const mockDispatch = vi.fn();
    store.dispatch = mockDispatch;
    const formikMock = { setFieldValue: vi.fn() };

    const validForm: initialStateProductInterface = {
      productName: 'Example Product',
      productPrice: 10,
      quantity: 5,
      expDate: new Date(),
      category: 'Example Category',
      bonus: 2,
      description:
        'Lorem ipsum dolor sit amet amet amet amet amet amet amet amet amet amet amet amet amet amet amet amet amet amet amet amet amet amet amet ',
      image: [
        { url: 'xxx', file: { path: 'pa1' } },
        { url: 'xxx1', file: { path: 'pa12' } },
        { url: 'xxx2', file: { path: 'pa13' } },
        { url: 'xxx3', file: { path: 'pa14' } },
        { url: 'xxx4', file: { path: 'pa15' } },
      ],
    };
    const updatedImagesMock = [
      { url: 'image1.jpg', file: new File([''], 'image1.jpg') },
      { url: 'image2.jpg', file: new File([''], 'image2.jpg') },
      { url: 'image3.jpg', file: new File([''], 'image3.jpg') },
      { url: 'image4.jpg', file: new File([''], 'image4.jpg') },
    ];

    fireEvent.change(screen.getByRole('productName'), { target: { value: validForm.productName } });
    fireEvent.change(screen.getByRole('productPrice'), {
      target: { value: validForm.productPrice },
    });
    fireEvent.change(screen.getByRole('quantity'), { target: { value: validForm.quantity } });
    fireEvent.change(screen.getByRole('expDate'), { target: { value: '2023-01-4' } });
    fireEvent.change(screen.getByRole('category'), { target: { value: validForm.category } });
    fireEvent.change(screen.getByRole('bonus'), { target: { value: validForm.bonus } });
    fireEvent.change(screen.getByRole('description'), { target: { value: validForm.description } });
    await waitFor(() => {
      const uploadonDrag = screen.getByTestId('uploadonDrag');
      userEvent.upload(
        uploadonDrag,
        updatedImagesMock.map((image) => image.file)
      );
    });
    formikMock.setFieldValue('image', [...updatedImagesMock]);

    const submitBtnx = screen.getByText('Submit');
    fireEvent.click(submitBtnx);
    expect(screen.getByText('Please select at least 4 images')).toBeInTheDocument();
  });
});
