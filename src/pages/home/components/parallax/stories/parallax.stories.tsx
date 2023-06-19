import type { Meta, StoryObj } from '@storybook/react';
import HomeParallax from '../homeParallax';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof HomeParallax> = {
  title: 'Pages/Home/HomeParallax',
  component: HomeParallax,
  decorators: [
    (StoryComponent) => (
      <MemoryRouter initialEntries={['/']}>
        <StoryComponent />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HomeParallax>;

export const Basic: Story = {};
