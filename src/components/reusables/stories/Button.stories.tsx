import { Button } from '../Reusable';

export default {
  title: 'Components/Reusables/Button',
  component: Button,
};

export const Default = {
  args: {
    text: 'Click Here',
    color: 'primary',
    type: 'submit',
    size: 'default',
    onClick: () => {
      alert('Button clicked!');
    },
  },
};

export const Small = {
  args: {
    text: 'Click Here',
    color: 'primary',
    type: 'submit',
    size: 'small',
    onClick: () => {
      alert('Small Button clicked!');
    },
  },
};

export const Medium = {
  args: {
    text: 'Click Here',
    color: 'primary',
    type: 'submit',
    size: 'medium',
    onClick: () => {
      alert('Medium Button clicked!');
    },
  },
};

export const Large = {
  args: {
    text: 'Click Here',
    color: 'primary',
    type: 'submit',
    size: 'large',
    onClick: () => {
      alert('Large Button clicked!');
    },
  },
};

export const Full = {
  args: {
    text: 'Click Here',
    color: 'primary',
    type: 'submit',
    size: 'full',
    onClick: () => {
      alert('Full Button clicked!');
    },
  },
};

export const CustomButton = {
  args: {
    text: 'Custom Button',
    color: 'green',
    type: 'submit',
    size: 'large',
    onClick: () => {
      alert('Button clicked!');
    },
  },
};
