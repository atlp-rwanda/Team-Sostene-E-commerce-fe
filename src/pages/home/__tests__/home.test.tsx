import { render, fireEvent, screen } from '@testing-library/react';
import Home from '../home';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import counterReducer, { increment, addValue } from '../../../redux/slices/counterSlice';
import { BrowserRouter } from 'react-router-dom';

const Mod = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  );
};

describe('Home Component', () => {
  let initialState: {
    counter: number;
    status: string;
  };

  beforeEach(() => {
    initialState = { counter: 0, status: 'idle' };
  });

  it('renders the home pages', async () => {
    const { getByText } = render(<Mod />);
    const pageTitle = getByText('Home page');
    expect(pageTitle).toBeInTheDocument();
  });

  it('should test increment reducer', function () {
    const nextState = counterReducer(initialState, increment());
    expect(nextState.counter).toEqual(1);
  });

  it('should test addvalue reducer', function () {
    const nextState = counterReducer(initialState, addValue(2));
    expect(nextState.counter).toEqual(2);
  });

  it('integration test of the component ', function () {
    render(<Mod />);
    const Ele = screen.getByText(/counter state/i);
    const btnElement = screen.getByRole('button', { name: 'INCREMENT COUNTER' });
    fireEvent.click(btnElement);
    expect(Ele.textContent).toBe('Counter state 1');
  });
  test('updates input value on change', () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    const input = getByTestId('Input');
    fireEvent.change(input, { target: { value: 'Test input' } });

    const inputValue = getByText('Click Here to go TFA');
    expect(inputValue).toBeInTheDocument();
  });
});