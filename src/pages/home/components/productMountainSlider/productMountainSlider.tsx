/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import styles from './productMountainSlider.module.scss';
import RecommendedProducts from '../recommendedProducts/recommendedProducts';
import { useNavigate } from 'react-router-dom';

const RADIUS = 1200;
const FLIP_RANGE = 3;

interface newProduct {
  productImages: { url: string }[];
  details?: string;
  id: string;
  category: string;
  ratings?: number;
  price: number;
  bonus: number;
  collectionId: string;
  createdAt?: string;
  expDate: string;
  expiredflag: boolean;
  name: string;
  quantity: number;
}

interface ProductsProps {
  imageData: newProduct[];
}

export default function ProductMountainSlider(props: ProductsProps) {
  const { imageData } = props;
  const dataImagesDoubled = [...imageData, ...imageData];
  const el = useRef<HTMLDivElement>(null);
  let angleUnit: number, currentIndex: number, currentAngle: number;
  const navigate = useNavigate();

  function setTransform(
    el: HTMLDivElement,
    xpos: number,
    zpos: number,
    angle: number,
    flipAngle: number
  ) {
    el.style.transform = `translateX(${xpos}px) translateZ(${zpos}px) rotateY(${angle}deg) rotateX(${flipAngle}deg)`;
  }

  useEffect(() => {
    angleUnit = 360 / dataImagesDoubled.length;
    currentIndex = currentAngle = 0;
    target(0, true, dataImagesDoubled[0].id);
  }, [dataImagesDoubled]);

  function target(index: number, initial = false, id: string) {
    if (!initial && index == currentIndex) pickImage(id);

    let deltaAngle = -(index - currentIndex) * angleUnit;
    if (deltaAngle < -180) deltaAngle += 360;
    else if (deltaAngle > 180) deltaAngle -= 360;

    currentAngle += deltaAngle;
    currentIndex = index;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const cf = el.current!;
    cf.style.transform = `translateZ(-1250px) rotateY(${currentAngle}deg)`;

    let fliptAngle = 90;
    const items = cf.children;

    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLDivElement;
      const itemAngle = angleUnit * i;
      const itemAngleRad = (itemAngle * Math.PI) / 180;
      const xpos = Math.sin(itemAngleRad) * RADIUS;
      const zpos = Math.cos(itemAngleRad) * RADIUS;

      let deltaIndex = Math.abs(i - index);
      if (deltaIndex > cf.children.length / 2) {
        deltaIndex = cf.children.length - deltaIndex;
      }
      if (deltaIndex <= FLIP_RANGE) {
        fliptAngle = deltaIndex * (90 / FLIP_RANGE);
      } else fliptAngle = 90;
      setTransform(item, xpos, zpos, itemAngle, fliptAngle);
    }
  }

  const pickImage = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className="carouselflow" ref={el}>
        {dataImagesDoubled.map((it, index) => (
          <div key={index} className="carouselflow-item">
            <RecommendedProducts showImage={target} index={index} data={it} />
          </div>
        ))}
      </div>
    </div>
  );
}
