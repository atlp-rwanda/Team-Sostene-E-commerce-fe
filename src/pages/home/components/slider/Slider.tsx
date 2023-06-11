import { useEffect, useState } from 'react';

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
    <div className="slider relative">
      <ul className="items relative overflow-hidden w-full pb-[56.25%]">
        {items.map((item, index) => (
          <a href={item.link} key={item.image} className="">
            <li
              className={`item absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-600 ${
                index === currentIndex ? 'opacity-100' : ''
              }`}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover"
                style={{
                  WebkitMaskImage:
                    '-webkit-gradient(linear,left 50%,left bottom,from(rgba(0,0,0,1)),to(rgba(0,0,0,0)))',
                  maskImage:
                    'linear-gradient(0deg,rgba(235,235,235,0) 80%,rgba(255,255,255,0.325) 20%,rgb(227,227,227) 80%)',
                }}
              />
            </li>
          </a>
        ))}
      </ul>
      <button
        type="button"
        id="prev"
        onClick={() => handleButtonClick(true)}
        className=" m-0 left z-10 h-32 tablet:h-64 top-10 w-24 text-white text-lg bg-translucent absolute right-0"
        data-testid="prev-button"
      >
        <i className="fa fa-angle-right" aria-hidden="true"></i>
      </button>
      <button
        type="button"
        id="next"
        onClick={() => handleButtonClick(false)}
        className=" m-0 z-10 h-32 tablet:h-64 top-10 w-24 bg-translucent text-white text-lg absolute left-0"
        data-testid="next-button"
      >
        <i className="fa fa-angle-left" aria-hidden="true"></i>
      </button>
      <div className=" absolute bottom-48 left-0 w-full flex justify-center mt-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={` block w-3 z-10 bg-orange h-3 m-3 rounded-full border-none outline-none p-0 bg-yellow opacity-50 transition-opacity duration-400 ${
              index === currentIndex ? 'opacity-100' : ''
            }`}
            onClick={() => handleDotClick(index)}
            data-testid="dot-button"
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Slider;
