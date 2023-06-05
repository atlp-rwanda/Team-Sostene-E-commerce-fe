import { BrowserRouter } from 'react-router-dom';
import GoogleBtn from './button';

interface GoogleStoryProps {
  width: string;
}

const GoogleStory = ({ width }: GoogleStoryProps) => {
  return (
    <BrowserRouter>
      <GoogleBtn width={width} />
    </BrowserRouter>
  );
};

export default {
  title: 'App/googleButton',
  component: GoogleStory,
  argTypes: {
    width: { control: 'text' },
  },
};

export const Default = (args: GoogleStoryProps) => <GoogleStory {...args} />;

Default.args = {
  width: '100',
};
