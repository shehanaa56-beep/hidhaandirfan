import React from 'react';
import styles from './Moving.module.css';

const images = [
  '/images/1.jfif',
  '/images/2.jfif',
  '/images/3.jfif',
  '/images/4.jfif',
  '/images/6.jfif',
  '/images/7.avif',
  '/images/11.jfif',
  '/images/111.jfif',
  '/images/1111.jfif',
  '/images/1.jfif',
  '/images/2.jfif',
  '/images/3.jfif',
  '/images/4.jfif',
  '/images/6.jfif',
  '/images/11.jfif',
  '/images/111.jfif',
  '/images/1111.jfif',
];

export default function Moving() {
  return (
    <div className={styles.movingSlider}>
      <div className={styles.movingTrack}>
        {images.concat(images).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Moving ${index + 1}`}
            className={styles.movingImage}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
