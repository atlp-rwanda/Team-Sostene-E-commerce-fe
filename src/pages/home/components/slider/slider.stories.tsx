import type { Meta, StoryObj } from '@storybook/react';
import SlideShow from './MainSlider';
import store from '../../../../redux/store';
import { Provider } from 'react-redux';

const meta: Meta<typeof SlideShow> = {
  title: 'Pages/Home/SliderShow',
  component: SlideShow,
  decorators: [
    (StoryComponent) => (
      <Provider store={store}>
        <StoryComponent />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SlideShow>;

export const Basic: Story = {};
