'use client';

import { useState, useMemo } from 'react';
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

  const handleAddToCart = (product: Product, size: string) => {
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
  };

  return (
    <div className={styles.shopContent}>
      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Category</span>
          <div className={styles.filterTabs}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterTab} ${activeCategory === cat ? styles.filterTabActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Collection</span>
          <div className={styles.filterTabs}>
            {collections.map((col) => (
              <button
                key={col}
                className={`${styles.filterTab} ${activeCollection === col ? styles.filterTabActive : ''}`}
                onClick={() => setActiveCollection(col)}
              >
                {col}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className={styles.resultCount}>
        {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
      </p>

      {/* Product Grid */}
      <div className={styles.grid}>
        {filtered.map((product) => (
          <div key={product.id} className={styles.card}>
            <div className={styles.cardImageWrap}>
              <div className={styles.cardImage}>
                <div className={styles.cardImagePattern} aria-hidden="true" />
              </div>
              {product.isNew && (
                <span className={styles.cardBadge}>New</span>
              )}
            </div>

            <div className={styles.cardInfo}>
              <span className={styles.cardName}>{product.name}</span>
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
              setActiveCategory('All');
              setActiveCollection('All');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
