import type { Meta, StoryObj } from '@storybook/react';
import Contact from './contact';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof Contact> = {
  title: 'Pages/Contact',
  component: Contact,
  decorators: [
    (StoryComponent) => (
      <MemoryRouter initialEntries={['/contact']}>
        <StoryComponent />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Contact>;

export const Basic: Story = {};
