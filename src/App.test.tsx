import { render } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

describe('Testing App.tsx', () => {
  it('renders the App.tsx with correct test id', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const pageTitle = getByTestId('app');
    expect(pageTitle).toBeInTheDocument();
  });
});
