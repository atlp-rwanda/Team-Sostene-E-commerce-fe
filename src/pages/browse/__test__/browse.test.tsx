import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Browse from '../Browse';
import { vi } from 'vitest';
import axios from 'axios';

describe('Testing Render Browse', () => {
  test('Testing Render', () => {
    const mockAxios = vi.spyOn(axios, 'get').mockResolvedValue({
      response: {
        data: {
          products: [],
        },
      },
    });
    render(
      <BrowserRouter>
        <Browse />
      </BrowserRouter>
    );
    expect(mockAxios).toBeCalled();
  });
});
