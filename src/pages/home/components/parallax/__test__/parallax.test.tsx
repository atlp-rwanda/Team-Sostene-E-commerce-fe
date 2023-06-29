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
