'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './AnnouncementBar.module.css';

const announcements: { text: string; href?: string }[] = [
  { text: 'Complimentary Shipping on Orders Over $200' },
  { text: 'New Season — Now Available' },
  { text: 'Rated 4.9/5 — See What Our Customers Say', href: '/reviews' },
  { text: 'Wear Confidence' },
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

  const current = announcements[currentIndex];
  const content = (
    <p
      className={`${styles.text} ${isVisible ? styles.visible : styles.hidden}`}
    >
      {current.text}
    </p>
  );

  return (
    <div className={styles.bar} role="marquee" aria-live="polite">
      <div className={styles.container}>
        {current.href ? (
          <Link href={current.href} className={styles.link}>
            {content}
          </Link>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
