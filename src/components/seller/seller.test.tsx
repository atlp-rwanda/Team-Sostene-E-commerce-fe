// import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import Seller from './seller';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { MemoryRouter } from 'react-router-dom';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

const MockElement = () => {
  library.add(fab, fas);
  return (
    <MemoryRouter>
      <Provider store={store}>
        <Seller />
      </Provider>
    </MemoryRouter>
  );
};

describe('seller maincomponent', () => {
  it('return a selleritems components', () => {
    render(<MockElement />);
    const sellerItems = screen.getAllByTestId('sellerItemsId');
    expect(sellerItems.length).toBeGreaterThan(0);
  });
});
