import { useEffect, useState } from 'react';
import './slideshow.scss';

interface SliderProps {
  items: {
    link: string;
    image: string;
    alt: string;
  }[];
  interval: number;
}

function Slider(props: SliderProps) {
  const { items, interval } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const setSlider = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, interval);

    return () => {
      clearInterval(setSlider);
    };
  }, [interval, items]);

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  };

  const handleButtonClick = (isPrev: boolean) => {
    setCurrentIndex((prevIndex) =>
      isPrev ? (prevIndex + items.length - 1) % items.length : (prevIndex + 1) % items.length
    );
  };
  return (
    <div className="slider">
      <ul className="items">
        {items.map((item, index) => (
          <a href={item.link} key={item.image} className="d">
            <li className={`item ${index === currentIndex ? 'current' : ''}`}>
              <img src={item.image} alt={item.alt} />
            </li>
          </a>
        ))}
      </ul>
      <button
        type="button"
        id="prev"
        onClick={() => handleButtonClick(true)}
        className="button prev left"
        data-testid="prev-button"
      ></button>
      <button
        type="button"
        id="next"
        onClick={() => handleButtonClick(false)}
        className="button next right"
        data-testid="next-button"
      ></button>
      <div className="dots">
        <div className="dots">
          {items.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'current' : ''}`}
              onClick={() => handleDotClick(index)}
              data-testid="dot-button"
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
