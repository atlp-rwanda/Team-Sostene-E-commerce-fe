import { render, fireEvent, screen } from '@testing-library/react';
import ContactForm from './contact';

describe('Testing Contact Form', () => {
  test('renders the contact form', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText('Your Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Phone:')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Message:')).toBeInTheDocument();
    expect(screen.getByText('Send Message')).toBeInTheDocument();
  });

  test('submits the form with empty fields', () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('Your Name:'), {
      target: { value: 'Testing' },
    });
    fireEvent.change(screen.getByLabelText('Your Email:'), {
      target: { value: 'testingn@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Your Phone:'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByLabelText('Your Message:'), {
      target: { value: 'Hello Andela' },
    });

    fireEvent.click(screen.getByText('Send Message'));

    expect(screen.getByLabelText('Your Name:')).toHaveValue('');
    expect(screen.getByLabelText('Your Email:')).toHaveValue('');
    expect(screen.getByLabelText('Your Phone:')).toHaveValue('');
    expect(screen.getByLabelText('Your Message:')).toHaveValue('');
  });

  test('updates input field values on change', () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText('Your Name:'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Your Email:'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Your Phone:'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByLabelText('Your Message:'), {
      target: { value: 'Hello, World!' },
    });

    expect(screen.getByLabelText('Your Name:')).toHaveValue('John Doe');
    expect(screen.getByLabelText('Your Email:')).toHaveValue('john@example.com');
    expect(screen.getByLabelText('Your Phone:')).toHaveValue('1234567890');
    expect(screen.getByLabelText('Your Message:')).toHaveValue('Hello, World!');
  });
});
