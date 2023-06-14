import { fireEvent, render } from '@testing-library/react';
import ForgotPassword from '../ForgotPassword';
import { Provider } from 'react-redux';
import store from '../../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { useForgotPassword } from '../hooks';

describe('Testing Rendering of Forgot password pages', () => {
  test('Should render Forgot Password form', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ForgotPassword />
        </BrowserRouter>
      </Provider>
    );
    const submitButton = getByText('Send Link');
    fireEvent.click(submitButton);

    const title = getByText('Forgot Password');
    expect(title).toBeInTheDocument();

    fireEvent.change(getByTestId('email'), { target: { value: 'test@mail.com' } });
    expect(getByTestId('email')).toBeInTheDocument();
  });
});

describe('Testing Forgot password hooks', () => {
  test('Testing useForgotPassword', () => {
    const TestComponent = () => {
      const { handleSubmit } = useForgotPassword();

      const handleFormSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        handleSubmit({ email: 'test@example.com' });
      };

      return (
        <div>
          <form onSubmit={handleFormSubmit} data-testid="email-form">
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    };
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <TestComponent />
        </BrowserRouter>
      </Provider>
    );
    fireEvent.submit(getByTestId('email-form'));
    expect(getByTestId('email-form')).toBeInTheDocument();
  });
});
