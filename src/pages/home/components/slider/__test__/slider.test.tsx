import SlideShow from '../MainSlider';
import { screen, render, fireEvent, act } from '@testing-library/react';
import Slider from '../Slider';
import { vitest } from 'vitest';

describe('Testing Slideshow on homepage', () => {
  test('Should render slideshow component', () => {
    render(<SlideShow />);
    const slide = screen.getByAltText('slide');
    const slide1 = screen.getByAltText('slide1');
    const slide2 = screen.getByAltText('slide2');
    expect(slide).toBeInTheDocument();
    expect(slide1).toBeInTheDocument();
    expect(slide2).toBeInTheDocument();
  });
});

describe('Slider', () => {
  const items = [
    {
      link: 'https://example.com/image1',
      image:
        'https://static.vecteezy.com/system/resources/previews/007/535/204/non_2x/happy-summer-sale-web-banner-for-social-media-horizontal-poster-banner-space-area-and-background-free-vector.jpg',
      alt: 'Image 1',
    },
    {
      link: 'https://example.com/image2',
      image:
        'https://static.vecteezy.com/system/resources/previews/007/535/188/original/happy-summer-sale-web-banner-for-social-media-horizontal-poster-banner-space-area-and-background-vector.jpg',
      alt: 'Image 2',
    },
    {
      link: 'https://example.com/image3',
      image:
        'https://static.vecteezy.com/system/resources/previews/014/898/183/original/banner-spring-sale-beautiful-evening-landscape-the-yacht-floats-on-the-lake-river-mountains-and-water-sunset-sky-flowering-bushes-illustration-for-background-website-posters-flyers-vector.jpg',
      alt: 'Image 3',
    },
  ];

  beforeEach(() => {
    vitest.useFakeTimers();
  });

  afterEach(() => {
    vitest.runOnlyPendingTimers();
    vitest.useRealTimers();
  });

  test('renders the slider with items', () => {
    render(<Slider items={items} interval={3000} />);
    act(() => {
      // Verify that all items are rendered
      const sliderItems = screen.getAllByRole('listitem');
      expect(sliderItems).toHaveLength(items.length);

      // Verify that the initial item has the 'current' class
      expect(sliderItems[0]).toHaveClass('item');
    });
  });

  test('automatically switches to the next item', () => {
    render(<Slider items={items} interval={3000} />);
    act(() => {
      // Verify that the initial item is displayed
      expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    });

    act(() => {
      // Advance to the next item after the interval
      vitest.advanceTimersByTime(3000);
    });

    act(() => {
      // Verify that the next item is displayed
      expect(screen.getByAltText('Image 2')).toBeInTheDocument();
    });
  });

  test('clicking on the dot button updates the current item', () => {
    render(<Slider items={items} interval={3000} />);
    act(() => {
      // Click on the second dot button
      fireEvent.click(screen.getAllByTestId('dot-button')[1]);
    });

    act(() => {
      // Verify that the second item is displayed
      expect(screen.getByAltText('Image 2')).toBeInTheDocument();
    });
  });

  test('clicking on the previous button updates the current item', () => {
    render(<Slider items={items} interval={3000} />);
    act(() => {
      // Click on the previous button
      fireEvent.click(screen.getByTestId('prev-button'));
    });

    act(() => {
      // Verify that the last item is displayed
      expect(screen.getByAltText('Image 3')).toBeInTheDocument();
    });
  });

  test('clicking on the next button updates the current item', () => {
    render(<Slider items={items} interval={3000} />);
    act(() => {
      // Click on the next button
      fireEvent.click(screen.getByTestId('next-button'));
    });

    act(() => {
      // Verify that the second item is displayed
      expect(screen.getByAltText('Image 2')).toBeInTheDocument();
    });
  });
});
