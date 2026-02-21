'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import styles from './ShopContent.module.css';

type FilterCategory = 'All' | Product['category'];
type FilterCollection = 'All' | Product['collection'];
type SortOption = 'Featured' | 'Price: Low to High' | 'Price: High to Low' | 'Newest';
type PriceRange = 'All' | 'Under $200' | '$200 – $400' | '$400 – $600' | '$600+';

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

const sortOptions: SortOption[] = [
  'Featured',
  'Price: Low to High',
  'Price: High to Low',
  'Newest',
];

const priceRanges: PriceRange[] = [
  'All',
  'Under $200',
  '$200 – $400',
  '$400 – $600',
  '$600+',
];

const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];

const allMaterials = ['Wool', 'Cashmere', 'Silk', 'Cotton', 'Leather'];

function matchesPriceRange(price: number, range: PriceRange): boolean {
  switch (range) {
    case 'All': return true;
    case 'Under $200': return price < 200;
    case '$200 – $400': return price >= 200 && price <= 400;
    case '$400 – $600': return price > 400 && price <= 600;
    case '$600+': return price > 600;
  }
}

function productHasMaterial(product: Product, material: string): boolean {
  const keyword = material.toLowerCase();
  return product.fabricCare.some((line) => line.toLowerCase().includes(keyword));
}

export function ShopContent({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [activeCollection, setActiveCollection] =
    useState<FilterCollection>('All');
  const [sortBy, setSortBy] = useState<SortOption>('Featured');
  const [priceRange, setPriceRange] = useState<PriceRange>('All');
  const [newOnly, setNewOnly] = useState(false);
  const [activeSize, setActiveSize] = useState<string>('All');
  const [activeMaterial, setActiveMaterial] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { addItem } = useCart();

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      const matchCategory =
        activeCategory === 'All' || p.category === activeCategory;
      const matchCollection =
        activeCollection === 'All' || p.collection === activeCollection;
      const matchPrice = matchesPriceRange(p.price, priceRange);
      const matchNew = !newOnly || p.isNew;
      const matchSize =
        activeSize === 'All' || p.sizes.includes(activeSize);
      const matchMaterial =
        activeMaterial === 'All' || productHasMaterial(p, activeMaterial);
      return matchCategory && matchCollection && matchPrice && matchNew && matchSize && matchMaterial;
    });

    // Sort
    switch (sortBy) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'Featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [products, activeCategory, activeCollection, priceRange, newOnly, activeSize, activeMaterial, sortBy]);

  const activeFilterCount =
    (activeCategory !== 'All' ? 1 : 0) +
    (activeCollection !== 'All' ? 1 : 0) +
    (priceRange !== 'All' ? 1 : 0) +
    (newOnly ? 1 : 0) +
    (activeSize !== 'All' ? 1 : 0) +
    (activeMaterial !== 'All' ? 1 : 0) +
    (sortBy !== 'Featured' ? 1 : 0);

  const handleClearFilters = useCallback(() => {
    setActiveCategory('All');
    setActiveCollection('All');
    setSortBy('Featured');
    setPriceRange('All');
    setNewOnly(false);
    setActiveSize('All');
    setActiveMaterial('All');
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
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
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
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
            )}
            {priceRange !== 'All' && (
              <button
                className={styles.pill}
                onClick={() => setPriceRange('All')}
                aria-label={`Remove ${priceRange} filter`}
              >
                {priceRange}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
            )}
            {newOnly && (
              <button
                className={styles.pill}
                onClick={() => setNewOnly(false)}
                aria-label="Remove New Arrivals filter"
              >
                New Arrivals
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
            )}
            {activeSize !== 'All' && (
              <button
                className={styles.pill}
                onClick={() => setActiveSize('All')}
                aria-label={`Remove size ${activeSize} filter`}
              >
                Size: {activeSize}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
            )}
            {activeMaterial !== 'All' && (
              <button
                className={styles.pill}
                onClick={() => setActiveMaterial('All')}
                aria-label={`Remove ${activeMaterial} filter`}
              >
                {activeMaterial}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
            )}
            {sortBy !== 'Featured' && (
              <button
                className={styles.pill}
                onClick={() => setSortBy('Featured')}
                aria-label={`Remove ${sortBy} sort`}
              >
                {sortBy}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
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

      {/* Filter Drawer — always rendered, toggled via class */}
      <div
        className={`${styles.modalOverlay} ${isFilterOpen ? styles.modalOverlayVisible : ''}`}
        onClick={() => setIsFilterOpen(false)}
        aria-hidden={!isFilterOpen}
      />
      <div
        className={`${styles.modal} ${isFilterOpen ? styles.modalOpen : ''}`}
        role="dialog"
        aria-label="Filter products"
        aria-modal={isFilterOpen}
        aria-hidden={!isFilterOpen}
      >
        {/* Drawer Header */}
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

        {/* Drawer Body */}
        <div className={styles.modalBody}>
          {/* Sort By */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Sort By</span>
            <div className={styles.filterOptions}>
              {sortOptions.map((opt) => (
                <button
                  key={opt}
                  className={`${styles.filterOption} ${sortBy === opt ? styles.filterOptionActive : ''}`}
                  onClick={() => setSortBy(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
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

          {/* Collection */}
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

          {/* Price Range */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Price</span>
            <div className={styles.filterOptions}>
              {priceRanges.map((range) => (
                <button
                  key={range}
                  className={`${styles.filterOption} ${priceRange === range ? styles.filterOptionActive : ''}`}
                  onClick={() => setPriceRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* New Arrivals */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>New Arrivals</span>
            <div className={styles.filterOptions}>
              <button
                className={`${styles.filterToggle} ${newOnly ? styles.filterToggleActive : ''}`}
                onClick={() => setNewOnly(!newOnly)}
                role="switch"
                aria-checked={newOnly}
              >
                <span className={styles.filterToggleThumb} />
              </button>
              <span className={styles.filterToggleLabel}>
                {newOnly ? 'Showing new only' : 'Show all'}
              </span>
            </div>
          </div>

          {/* Size */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Size</span>
            <div className={styles.filterOptions}>
              <button
                className={`${styles.filterOption} ${activeSize === 'All' ? styles.filterOptionActive : ''}`}
                onClick={() => setActiveSize('All')}
              >
                All
              </button>
              {allSizes.map((size) => (
                <button
                  key={size}
                  className={`${styles.filterOption} ${activeSize === size ? styles.filterOptionActive : ''}`}
                  onClick={() => setActiveSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Material */}
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Material</span>
            <div className={styles.filterOptions}>
              <button
                className={`${styles.filterOption} ${activeMaterial === 'All' ? styles.filterOptionActive : ''}`}
                onClick={() => setActiveMaterial('All')}
              >
                All
              </button>
              {allMaterials.map((mat) => (
                <button
                  key={mat}
                  className={`${styles.filterOption} ${activeMaterial === mat ? styles.filterOptionActive : ''}`}
                  onClick={() => setActiveMaterial(mat)}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
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
