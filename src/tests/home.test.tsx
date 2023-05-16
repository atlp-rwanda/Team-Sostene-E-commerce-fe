import { describe, it } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Home from '../components/home/home';

describe('Home Component', () => {
  it('renders the home pages', async () => {
    const { getByText } = render(<Home />);
    const pageTitle = getByText('home page');
    expect(pageTitle).toBeInTheDocument();
  });
});



