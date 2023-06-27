import { Button, ErrorBox, InputWithLabel } from '../Reusable';
import { render } from '@testing-library/react';

test('tests the button component', () => {
  const wrapper = render(<Button text="Login" />);
  const button = wrapper.container.querySelector('button') as HTMLButtonElement;

  expect(button.textContent).toBe('Login');
});

test('renders the input field with label correctly', () => {
  const { getByTestId } = render(<InputWithLabel label="Username" textId="username" />);

  const inputElement = getByTestId('username');

  expect(inputElement).toBeInTheDocument();
});

test('renders the input field with label correctly', () => {
  const { getByText } = render(<ErrorBox message="An error occurred" />);

  const errorMsg = getByText('An error occurred');

  expect(errorMsg).toBeInTheDocument();
});
