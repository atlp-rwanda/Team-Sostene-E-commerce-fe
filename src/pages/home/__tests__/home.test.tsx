import { render } from '@testing-library/react';
import Home from '../home';

describe('Home Component', () => {
  it('renders the home pages', async () => {
    const { getByAltText } = render(<Home />);
    const slide = getByAltText('slide');
    expect(slide).toBeInTheDocument();
  });
});
