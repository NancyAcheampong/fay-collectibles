'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './AnnouncementBar.module.css';

const announcements = [
  'Complimentary Shipping on Orders Over $200',
  'New Season — Now Available',
  'Wear Confidence',
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const advance = useCallback(() => {
    setIsVisible(false);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
      setIsVisible(true);
    }, 400);
  }, []);

  useEffect(() => {
    const interval = setInterval(advance, 4000);
    return () => clearInterval(interval);
  }, [advance]);

  return (
    <div className={styles.bar} role="marquee" aria-live="polite">
      <div className={styles.container}>
        <p
          className={`${styles.text} ${isVisible ? styles.visible : styles.hidden}`}
        >
          {announcements[currentIndex]}
        </p>
      </div>
    </div>
  );
}
