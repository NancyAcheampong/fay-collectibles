'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { products } from '@/lib/products';
import styles from './SearchModal.module.css';

const trendingSearches = [
  { label: 'Wool Overcoat', href: '/shop?q=overcoat' },
  { label: 'Silk', href: '/shop?q=silk' },
  { label: 'New Season', href: '/shop?collection=new-season' },
  { label: 'Cashmere', href: '/shop?q=cashmere' },
  { label: 'The Essentials', href: '/shop?collection=the-essentials' },
  { label: 'Tailored Trousers', href: '/shop?q=trousers' },
];

const popularCategories = [
  { label: 'Outerwear', href: '/shop?category=outerwear' },
  { label: 'Tops', href: '/shop?category=tops' },
  { label: 'Bottoms', href: '/shop?category=bottoms' },
  { label: 'Accessories', href: '/shop?category=accessories' },
];

const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);

export function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Small delay so the slide-down animation is visible before focus
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.collection.toLowerCase().includes(query.toLowerCase()),
      )
    : featuredProducts;

  const displayProducts = filteredProducts.slice(0, 4);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={styles.backdrop}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div className={styles.modal} role="dialog" aria-label="Search">
        <div className={styles.modalInner}>
          {/* Search bar row */}
          <div className={styles.searchBar}>
            <svg
              className={styles.searchIcon}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="9"
                cy="9"
                r="6.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="13.5"
                y1="13.5"
                x2="18"
                y2="18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              className={styles.searchInput}
              placeholder="Search for products, collections..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close search"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <line
                  x1="5"
                  y1="5"
                  x2="19"
                  y2="19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="19"
                  y1="5"
                  x2="5"
                  y2="19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Two-column content */}
          <div className={styles.content}>
            {/* Left: Product image tiles */}
            <div className={styles.productsColumn}>
              <h3 className={styles.columnTitle}>
                {query.trim() ? 'Results' : 'Trending Now'}
              </h3>
              <div className={styles.productGrid}>
                {displayProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className={styles.productTile}
                    onClick={onClose}
                  >
                    <div className={styles.productImage} />
                    <span className={styles.productName}>{product.name}</span>
                    <span className={styles.productPrice}>
                      ${product.price}
                    </span>
                  </Link>
                ))}
                {query.trim() && displayProducts.length === 0 && (
                  <p className={styles.noResults}>
                    No results for &ldquo;{query}&rdquo;
                  </p>
                )}
              </div>
            </div>

            {/* Right: Trending searches + categories */}
            <div className={styles.searchesColumn}>
              <div className={styles.searchGroup}>
                <h3 className={styles.columnTitle}>Trending Searches</h3>
                <ul className={styles.searchList}>
                  {trendingSearches.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={styles.searchLink}
                        onClick={onClose}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 20 20"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle
                            cx="9"
                            cy="9"
                            r="6.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <line
                            x1="13.5"
                            y1="13.5"
                            x2="18"
                            y2="18"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.searchGroup}>
                <h3 className={styles.columnTitle}>Popular Categories</h3>
                <ul className={styles.categoryList}>
                  {popularCategories.map((cat) => (
                    <li key={cat.label}>
                      <Link
                        href={cat.href}
                        className={styles.categoryLink}
                        onClick={onClose}
                      >
                        {cat.label}
                        <svg
                          width="14"
                          height="14"
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
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
