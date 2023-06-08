import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RatingsCounter from './ratingsCounter';

describe('RatingsCounter', () => {
  it('renders correct number of stars based on rating = 3', () => {
    const { getAllByAltText, getByText, getAllByRole } = render(<RatingsCounter rating={3} />);

    const starImages = getAllByAltText('Star');
    const ratingNumber = getByText('(3)');
    expect(starImages).toHaveLength(5);
    expect(ratingNumber).toBeInTheDocument();
    const images = getAllByRole('img');
    expect(images[2]).toHaveAttribute('src', './svgs/starRated.svg');
    images.forEach((img) => {
      expect(img).toHaveAttribute('src');
    });
  });
  it('renders correct number of stars based on rating = 5', () => {
    const { getAllByAltText, getByText, getAllByRole } = render(<RatingsCounter rating={5} />);
    const starImages = getAllByAltText('Star');
    const ratingNumber = getByText('(5)');
    expect(starImages).toHaveLength(5);
    expect(ratingNumber).toBeInTheDocument();
    const images = getAllByRole('img');
    expect(images[4]).toHaveAttribute('src', './svgs/starRated.svg');
    images.forEach((img) => {
      expect(img).toHaveAttribute('src');
    });
  });
  it('renders correct number of stars based on rating = 0', () => {
    const { getAllByAltText, getByText, getAllByRole } = render(<RatingsCounter rating={0} />);
    const starImages = getAllByAltText('Star');
    const ratingNumber = getByText('(0)');
    expect(starImages).toHaveLength(5);
    expect(ratingNumber).toBeInTheDocument();
    const images = getAllByRole('img');
    images.forEach((img) => {
      expect(img).toHaveAttribute('src', './svgs/star.svg');
    });
  });
  it('renders correct number of stars based on rating = 1', () => {
    const { getAllByAltText, getByText, getAllByRole } = render(<RatingsCounter rating={1} />);
    const starImages = getAllByAltText('Star');
    const ratingNumber = getByText('(1)');
    expect(starImages).toHaveLength(5);
    expect(ratingNumber).toBeInTheDocument();
    const images = getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', './svgs/starRated.svg');
    expect(images[3]).toHaveAttribute('src', './svgs/star.svg');
    images.forEach((img) => {
      expect(img).toHaveAttribute('src');
    });
  });
  it('renders correct number of stars based on rating = 2', () => {
    const { getAllByAltText, getByText, getAllByRole } = render(<RatingsCounter rating={2} />);
    const starImages = getAllByAltText('Star');
    const ratingNumber = getByText('(2)');
    expect(starImages).toHaveLength(5);
    expect(ratingNumber).toBeInTheDocument();
    const images = getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', './svgs/starRated.svg');
    expect(images[3]).toHaveAttribute('src', './svgs/star.svg');
    images.forEach((img) => {
      expect(img).toHaveAttribute('src');
    });
  });
  it('renders correct number of stars based on rating = 4', () => {
    const { getAllByAltText, getByText, getAllByRole } = render(<RatingsCounter rating={4} />);
    const starImages = getAllByAltText('Star');
    const ratingNumber = getByText('(4)');
    expect(starImages).toHaveLength(5);
    expect(ratingNumber).toBeInTheDocument();
    const images = getAllByRole('img');
    expect(images[1]).toHaveAttribute('src', './svgs/starRated.svg');
    expect(images[4]).toHaveAttribute('src', './svgs/star.svg');
    images.forEach((img) => {
      expect(img).toHaveAttribute('src');
    });
  });
});
