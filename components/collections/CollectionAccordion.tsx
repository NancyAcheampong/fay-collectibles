'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './CollectionAccordion.module.css';

export type CollectionItem = {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  productCount: number;
  priceRange: string;
};

export function CollectionAccordion({
  collections,
}: {
  collections: CollectionItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={styles.accordion}>
      {collections.map((collection, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={collection.slug}
            className={`${styles.strip} ${isOpen ? styles.stripOpen : ''}`}
          >
            <button
              className={styles.stripHeader}
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
            >
              <span className={styles.stripNumber}>0{index + 1}</span>
              <span className={styles.stripName}>{collection.name}</span>
              <span className={styles.stripTagline}>{collection.tagline}</span>
              <span className={styles.stripCount}>
                {collection.productCount}{' '}
                {collection.productCount === 1 ? 'piece' : 'pieces'}
              </span>
              <svg
                className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              className={styles.stripBody}
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className={styles.stripBodyInner}>
                <p className={styles.description}>{collection.description}</p>
                <div className={styles.meta}>
                  <span className={styles.metaItem}>
                    {collection.productCount}{' '}
                    {collection.productCount === 1 ? 'piece' : 'pieces'}
                  </span>
                  {collection.priceRange && (
                    <>
                      <span className={styles.metaDot} />
                      <span className={styles.metaItem}>
                        {collection.priceRange}
                      </span>
                    </>
                  )}
                </div>
                <Link
                  href={`/shop?collection=${collection.slug}`}
                  className={styles.exploreLink}
                >
                  Explore Collection
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
