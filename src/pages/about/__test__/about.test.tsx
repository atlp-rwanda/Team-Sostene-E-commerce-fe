import { render } from '@testing-library/react';
import About_us from '../about_us';

describe('Testing About Page', () => {
  it('Should Render', () => {
    const { getByTestId } = render(<About_us />);
    expect(getByTestId('about-page')).toBeInTheDocument();
  });
});
