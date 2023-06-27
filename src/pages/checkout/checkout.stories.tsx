import type { Meta, StoryObj } from '@storybook/react';
import Checkout from './Checkout';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof Checkout> = {
  title: 'Pages/Checkout',
  component: Checkout,
  decorators: [
    (StoryComponent) => (
      <MemoryRouter initialEntries={['/checkout']}>
        <Provider store={store}>
          <StoryComponent />
        </Provider>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Checkout>;

export const Basic: Story = {};
