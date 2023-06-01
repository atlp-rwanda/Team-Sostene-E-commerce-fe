// Accounts.story.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import Accounts from '../Accounts';
import store, { persistor } from '../../../redux/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

const meta: Meta<typeof Accounts> = {
  title: 'Pages/Accounts/Accounts/Accounts_Form',
  component: Accounts,
  decorators: [
    (StoryComponent) => (
      <MemoryRouter initialEntries={['/authenticate/test@mail.com']}>
        <Provider store={store}>
          <PersistGate loading={<p>Loading..</p>} persistor={persistor}>
            <StoryComponent />
          </PersistGate>
        </Provider>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Accounts>;

export const Basic: Story = {};
