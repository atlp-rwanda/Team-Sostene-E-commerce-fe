import { render } from '@testing-library/react';
import GoogleLoginSuccess from '../successLogin';

describe('Testing About Page', () => {
  it('Should Render', () => {
    const { getByTestId } = render(<GoogleLoginSuccess />);
    expect(getByTestId('login-success')).toBeInTheDocument();
  });
});
