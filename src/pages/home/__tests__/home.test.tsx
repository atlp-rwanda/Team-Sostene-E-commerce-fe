import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Home from '../home';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import routes from '../../../utils/routes';

const MockElement = () => {
  library.add(fab, fas);
  return (
    <Provider store={store}>
      <BrowserRouter basename={routes.home}>
        <Home />
      </BrowserRouter>
    </Provider>
  );
};

describe('Home Component', () => {
  it('renders the home page', async () => {
    const { getByTestId } = render(<MockElement />);
    const homeComponent = getByTestId('home');
    expect(homeComponent).toBeInTheDocument();
    const { getAllByText, getAllByRole } = render(<MockElement />);
    const img = getAllByRole('img');
    const result1 = getAllByText('New Release');
    expect(result1.length).toBeGreaterThan(0);
    expect(img.length).toBeGreaterThan(0);
  });
});
