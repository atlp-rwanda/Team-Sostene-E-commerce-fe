// Accounts.story.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import NotificationPane from './notificationPane';
import store, { persistor } from '../../redux/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

const meta: Meta<typeof NotificationPane> = {
  title: 'Components/Navigation/NotificationPane',
  component: NotificationPane,
  decorators: [
    (StoryComponent) => (
      <MemoryRouter initialEntries={['/']}>
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
type Story = StoryObj<typeof NotificationPane>;

export const Basic: Story = {};
