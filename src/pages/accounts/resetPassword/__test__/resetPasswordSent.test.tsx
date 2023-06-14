import { render } from '@testing-library/react';
import ResetLinkSent from '../ResetLinkSent';
import { Provider } from 'react-redux';
import store from '../../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

describe('Testing Rendering of Forgot password pages', () => {
  test('Should render reset Password link sent page', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ResetLinkSent />
        </BrowserRouter>
      </Provider>
    );
    const message = getByText('Check your email for the reset password link!');
    expect(message).toBeInTheDocument();
  });
});
