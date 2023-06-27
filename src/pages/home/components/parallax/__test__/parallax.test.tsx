<<<<<<< HEAD
import { render } from '@testing-library/react';
import HomeParallax from '../homeParallax';
import { Provider } from 'react-redux';
import store from '../../../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

describe('Testing Rendering of Parallax on the homepage', () => {
  test('Should render Parallax component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <HomeParallax />
        </BrowserRouter>
      </Provider>
    );
    const message = getByText(/Discover a world of shopping delight at shopSpree/i);
    expect(message).toBeInTheDocument();

    const buttonText = getByText('Start shopping!');
    expect(buttonText).toBeInTheDocument();
  });
});
=======
import { render } from '@testing-library/react';
import HomeParallax from '../homeParallax';
import { Provider } from 'react-redux';
import store from '../../../../../redux/store';
import { BrowserRouter } from 'react-router-dom';

describe('Testing Rendering of Parallax on the homepage', () => {
  test('Should render Parallax component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <HomeParallax />
        </BrowserRouter>
      </Provider>
    );
    const message = getByText(
      'Discover a World of Shopping Delight at ShopSpree. Shop the Latest Trends in Fashion, Home Decor, Electronics, and More!'
    );
    expect(message).toBeInTheDocument();

    const buttonText = getByText('Start Shopping!');
    expect(buttonText).toBeInTheDocument();
  });
});
>>>>>>> A seller should be to update the product in case he/she needs to - ensures that user have the form to update their certain products -allow user to view a way to update an image displayed on product also Delivers #185172094]
