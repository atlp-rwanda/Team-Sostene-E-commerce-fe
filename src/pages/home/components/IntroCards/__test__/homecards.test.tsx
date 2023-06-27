import { render } from '@testing-library/react';
import HomeCards, { AnimatedCard, Categories, CategoryCard, JoinUsCard } from '../HomeCards';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import axios from 'axios';

describe('Testing Cards', () => {
  test('Testing render animated card', () => {
    const { getByTestId } = render(<AnimatedCard />);
    expect(getByTestId('animated-card')).toBeInTheDocument();
  });
  test('Testing render Join Us card', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <JoinUsCard />
      </BrowserRouter>
    );
    expect(getByTestId('joinus-card')).toBeInTheDocument();
  });
  test('Testing render Category card', () => {
    const text = 'test text';
    const { getByText } = render(
      <BrowserRouter>
        <CategoryCard text={text} />
      </BrowserRouter>
    );
    expect(getByText(text)).toBeInTheDocument();
  });
  test('Testing render Categories card', () => {
    const text = 'text';
    const mockAxios = vi.spyOn(axios, 'get').mockResolvedValue({
      data: {
        products: [
          {
            name: 'product',
            productImages: [
              {
                url: 'www.images/image.jpg',
              },
            ],
          },
          {
            name: 'product',
          },
        ],
      },
    });
    const { getByText } = render(
      <BrowserRouter>
        <Categories query={text} title={text} />
      </BrowserRouter>
    );
    expect(getByText(text)).toBeInTheDocument();
    expect(mockAxios).toBeCalled();
  });
  test('Testing render Categories cards with error', () => {
    const text = 'text';
    const mockAxios = vi.spyOn(axios, 'get').mockRejectedValue({});
    const { getByText } = render(
      <BrowserRouter>
        <Categories query={text} title={text} />
      </BrowserRouter>
    );
    expect(getByText(text)).toBeInTheDocument();
    expect(mockAxios).toBeCalled();
  });
  test('Testing render Home Cards', () => {
    const mockAxios = vi.spyOn(axios, 'get').mockResolvedValue({
      data: {
        products: [
          {
            name: 'product',
            productImages: [
              {
                url: 'www.images/image.jpg',
              },
            ],
          },
          {
            name: 'product',
          },
        ],
      },
    });
    render(
      <BrowserRouter>
        <HomeCards />
      </BrowserRouter>
    );
    expect(mockAxios).toBeCalled();
  });
});
