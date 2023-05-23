import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import DemoInput from './demoInput';

describe('DemoInput', () => {
  it('renders an input element with the correct class based on size prop', () => {
    render(<DemoInput size="long" />);

    const emailElement = screen.getByPlaceholderText('email');
    expect(emailElement).toBeInTheDocument();
  });

  it('renders an input element with the correct class for short size', () => {
    render(<DemoInput size="short" />);

    const emailElement = screen.getByPlaceholderText('email');
    expect(emailElement).toBeInTheDocument();
  });

  it('renders an input element with the default class for unknown size', () => {
    render(<DemoInput size="unknown" />);

    const emailElement = screen.getByPlaceholderText('email');
    expect(emailElement).toBeInTheDocument();
  });
});
