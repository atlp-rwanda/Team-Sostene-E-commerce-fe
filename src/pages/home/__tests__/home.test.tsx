import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
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
  it('renders nav links', () => {
    render(<MockElement />);

    const linkElement = screen.getByText('Contact');
    const linkElementx = screen.getByTestId('home');
    expect(linkElement).toBeInTheDocument();
    expect(linkElementx).toBeInTheDocument();
  });

  it('renders the home page', async () => {
    const { getByAltText } = render(<MockElement />);
    const slide = getByAltText('slide');
    expect(slide).toBeInTheDocument();
  });
});
