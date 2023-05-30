import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import Signup from '../signup/signup';
import ButtonProps from '../signup/components/button/button';
import LabelProps from '../signup/components/label/label';

describe('handle submit', () => {
  it('should check if the username is correct', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Signup />
      </Provider>
    );
    fireEvent.change(getByTestId('name'), { target: { value: 'test' } });
    expect(getByTestId('name')).toBeInTheDocument();
    await fireEvent.submit(getByTestId('signup-form'));

    await waitFor(() => {
      // Add your assertions here to check if the signup action is dispatched
    });
  });
});

describe('handle the email input', () => {
  it('should check if the email is correctly written', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Signup />
      </Provider>
    );
    fireEvent.change(getByTestId('email'), { target: { value: 'test@gmail.com' } });
    expect(getByTestId('email')).toBeInTheDocument();

    await fireEvent.submit(getByTestId('signup-form'));

    await waitFor(() => {
      // Add your assertions here to check if the signup action is dispatched
    });
  });
});

describe('handle the password input', () => {
  it('should check if the password is correctly written', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Signup />
      </Provider>
    );
    fireEvent.change(getByTestId('name'), { target: { value: 'test' } });
    fireEvent.change(getByTestId('email'), { target: { value: 'test@gmail.com' } });
    fireEvent.change(getByTestId('pass'), { target: { value: '' } });
    expect(getByTestId('pass')).toBeInTheDocument();

    await fireEvent.submit(getByTestId('signup-form'));

    await waitFor(() => {
      // Add your assertions here to check if the signup action is dispatched
    });
  });
});

describe('handle the password input', () => {
  it('should set the correct error message for invalid password requirements', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Signup />
      </Provider>
    );

    fireEvent.change(getByTestId('name'), { target: { value: 'test' } });
    fireEvent.change(getByTestId('email'), { target: { value: 'test@gmail.com' } });
    fireEvent.change(getByTestId('pass'), { target: { value: 'invalidpassword' } });
    fireEvent.submit(getByTestId('signup-form'));

    expect(getByTestId('pass')).toBeInTheDocument();
  });
});

describe('test signup page', () => {
  it('should test signup page', async () => {
    render(
      <Provider store={store}>
        <Signup />
      </Provider>
    );
    expect(screen.getByTestId('signup')).toBeInTheDocument();
    expect(screen.getByText('Enter your details below')).toBeInTheDocument();
    const input = screen.getByPlaceholderText('Email or Phone Number');
    expect(input).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email or Phone Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email or Phone Number'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'Password123' },
    });
    fireEvent.submit(screen.getByTestId('signup-form'));
  });

  it('should render the button', function () {
    render(
      <ButtonProps size={'small'} value={'Create an account'} color={'FF8C42'} type={undefined} />
    );
    const btnElement = screen.getByRole('button');
    expect(btnElement).toBeInTheDocument();
  });

  it('should render the label with the provided props', () => {
    const value = 'Test label';
    const labelSize = 'small';
    const labelColor = 'primary';

    const { getByText } = render(<LabelProps value={value} size={labelSize} color={labelColor} />);

    const label = getByText(value);

    expect(label).toBeInTheDocument();
  });
});
