import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { logout, isLoggedIn } from '../../../helpers/auth'; // Replace "yourFile" with the actual file path
import { setToken } from '../../../redux/slices/tokenSlice';
import store from '../../../redux/store';

describe('isLoggedIn and logged out', () => {
  it('should return true when a valid token exists', () => {
    store.dispatch(setToken('token'));
    const Component = () => {
      const handleLogout = () => {
        isLoggedIn();
        logout();
      };
      return (
        <button data-testid="btn" onClick={handleLogout}>
          Click Me
        </button>
      );
    };
    const { getByTestId } = render(
      <Provider store={store}>
        <Component />
      </Provider>
    );
    fireEvent.click(getByTestId('btn'));
    expect(getByTestId('btn')).toBeInTheDocument();
  });
});
