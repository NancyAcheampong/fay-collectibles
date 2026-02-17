'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import styles from './ShopContent.module.css';

type FilterCategory = 'All' | Product['category'];
type FilterCollection = 'All' | Product['collection'];

const categories: FilterCategory[] = [
  'All',
  'Tops',
  'Bottoms',
  'Outerwear',
  'Accessories',
];

const collections: FilterCollection[] = [
  'All',
  'The Essentials',
  'New Season',
  'The Edit',
];

export function ShopContent({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [activeCollection, setActiveCollection] =
    useState<FilterCollection>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { addItem } = useCart();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        activeCategory === 'All' || p.category === activeCategory;
      const matchCollection =
        activeCollection === 'All' || p.collection === activeCollection;
      return matchCategory && matchCollection;
    });
  }, [products, activeCategory, activeCollection]);

  const activeFilterCount =
    (activeCategory !== 'All' ? 1 : 0) +
    (activeCollection !== 'All' ? 1 : 0);

  const handleClearFilters = useCallback(() => {
    setActiveCategory('All');
    setActiveCollection('All');
  }, []);

  const handleAddToCart = useCallback(
    (product: Product, size: string) => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        size,
        quantity: 1,
        image: product.images[0] || '',
        slug: product.slug,
      });
      setSelectedProduct(null);
      setSelectedSize('');
    },
    [addItem],
  );

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFilterOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isFilterOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFilterOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFilterOpen]);

  return (
    <div className={styles.shopContent}>
      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <button
          className={styles.filterTrigger}
          onClick={() => setIsFilterOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isFilterOpen}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 4h12M4 8h8M6 12h4"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className={styles.filterBadge}>{activeFilterCount}</span>
          )}
        </button>

        {/* Active filter pills */}
        {activeFilterCount > 0 && (
          <div className={styles.activePills}>
            {activeCategory !== 'All' && (
              <button
                className={styles.pill}
                onClick={() => setActiveCategory('All')}
                aria-label={`Remove ${activeCategory} filter`}
              >
                {activeCategory}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 3l6 6M9 3l-6 6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
            {activeCollection !== 'All' && (
              <button
                className={styles.pill}
                onClick={() => setActiveCollection('All')}
                aria-label={`Remove ${activeCollection} filter`}
              >
                {activeCollection}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 3l6 6M9 3l-6 6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
            <button
              className={styles.clearAll}
              onClick={handleClearFilters}
            >
              Clear all
            </button>
          </div>
        )}

        <p className={styles.resultCount}>
          {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
        </p>
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsFilterOpen(false)}
          role="presentation"
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-label="Filter products"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Filters</h2>
              <button
                className={styles.modalClose}
                onClick={() => setIsFilterOpen(false)}
                aria-label="Close filters"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 5l10 10M15 5l-10 10"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body — grows with content */}
            <div className={styles.modalBody}>
              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Category</span>
                <div className={styles.filterOptions}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`${styles.filterOption} ${activeCategory === cat ? styles.filterOptionActive : ''}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Collection</span>
                <div className={styles.filterOptions}>
                  {collections.map((col) => (
                    <button
                      key={col}
                      className={`${styles.filterOption} ${activeCollection === col ? styles.filterOptionActive : ''}`}
                      onClick={() => setActiveCollection(col)}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={styles.modalFooter}>
              <button
                className={styles.modalClear}
                onClick={handleClearFilters}
                disabled={activeFilterCount === 0}
              >
                Clear All
              </button>
              <button
                className={styles.modalApply}
                onClick={() => setIsFilterOpen(false)}
              >
                Show {filtered.length} {filtered.length === 1 ? 'Piece' : 'Pieces'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className={styles.grid}>
        {filtered.map((product) => (
          <div key={product.id} className={styles.card}>
            <Link href={`/product/${product.slug}`} className={styles.cardImageWrap}>
              <div className={styles.cardImage} />
              {product.isNew && (
                <span className={styles.cardBadge}>New</span>
              )}
            </Link>

            <div className={styles.cardInfo}>
              <Link href={`/product/${product.slug}`} className={styles.cardName}>{product.name}</Link>
              <span className={styles.cardPrice}>
                ${product.price.toLocaleString()}
              </span>
              <span className={styles.cardCollection}>
                {product.collection}
              </span>
            </div>

            {selectedProduct?.id === product.id ? (
              <div className={styles.sizeSelector}>
                <div className={styles.sizes}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`${styles.sizeButton} ${selectedSize === size ? styles.sizeButtonActive : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button
                  className={styles.addButton}
                  disabled={!selectedSize}
                  onClick={() => handleAddToCart(product, selectedSize)}
                >
                  {selectedSize ? 'Add to Bag' : 'Select Size'}
                </button>
              </div>
            ) : (
              <button
                className={styles.quickAdd}
                onClick={() => {
                  setSelectedProduct(product);
                  setSelectedSize('');
                }}
              >
                Quick Add
              </button>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>No products found.</p>
          <button
            className={styles.emptyReset}
            onClick={() => {
              handleClearFilters();
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
