import { fireEvent, render } from '@testing-library/react';
import ResetSuccessful from '../ResetPasswordSuccessful';
import { Provider } from 'react-redux';
import store from '../../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

describe('Testing Rendering of Forgot password pages', () => {
  test('Should render Reset Password successful page', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ResetSuccessful />
        </BrowserRouter>
      </Provider>
    );

    const submitButton = getByText('Login');
    fireEvent.click(submitButton);

    const message = getByText('Password reset successfully!');
    expect(message).toBeInTheDocument();
  });
});
