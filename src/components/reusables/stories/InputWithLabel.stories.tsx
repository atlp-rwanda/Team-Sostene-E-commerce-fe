import { InputWithLabel } from '../Reusable';

export default {
  title: 'Components/Reusables/InputWithLabel',
  component: InputWithLabel,
};

export const Default = {
  args: {
    label: 'Name',
  },
};

export const EmailInput = {
  args: {
    label: 'Email',
    type: 'email',
  },
};

export const PasswordInput = {
  args: {
    label: 'Password',
    type: 'password',
  },
};

export const ValueBinding = {
  args: {
    label: 'Value',
    value: 'Initial Value',
  },
};
