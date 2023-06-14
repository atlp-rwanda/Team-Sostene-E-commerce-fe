import type { Meta, StoryObj } from '@storybook/react';
import Accounts from '../../Accounts';
import store from '../../../../redux/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof Accounts> = {
  title: 'Pages/Accounts/ForgotPasswordForm',
  component: Accounts,
  decorators: [
    (StoryComponent) => (
      <MemoryRouter initialEntries={['/reset-password/']}>
        <Provider store={store}>
          <StoryComponent />
        </Provider>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Accounts>;

export const Basic: Story = {};
