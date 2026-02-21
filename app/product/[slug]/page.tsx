'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getFeaturedProducts, type Product } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import styles from './page.module.css';

function ProductDetail({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'fabric'>('details');
  const { addItem } = useCart();
  const recommendations = getFeaturedProducts()
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: 1,
      image: product.images[0] || '',
      slug: product.slug,
    });
    setSelectedSize('');
  };

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <ol className={styles.breadcrumbList}>
          <li className={styles.breadcrumbItem}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          </li>
          <li className={styles.breadcrumbSep} aria-hidden="true">/</li>
          <li className={styles.breadcrumbItem}>
            <Link href="/shop" className={styles.breadcrumbLink}>Shop</Link>
          </li>
          <li className={styles.breadcrumbSep} aria-hidden="true">/</li>
          <li className={styles.breadcrumbItem}>
            <span className={styles.breadcrumbCurrent} aria-current="page">
              {product.name}
            </span>
          </li>
        </ol>
      </nav>

      {/* Product Main */}
      <div className={styles.productMain}>
        {/* Image Gallery */}
        <div className={styles.gallery}>
          <div className={styles.imagePrimary}>
            <div className={styles.imagePlaceholder} />
          </div>
          <div className={styles.imageSecondary}>
            <div className={styles.imagePlaceholder} />
          </div>
        </div>

        {/* Product Info */}
        <div className={styles.info}>
          <div className={styles.infoTop}>
            <span className={styles.collection}>{product.collection}</span>
            {product.isNew && <span className={styles.badge}>New</span>}
          </div>

          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>${product.price.toLocaleString()}</p>

          <p className={styles.description}>{product.description}</p>

          {/* Size Selector */}
          <div className={styles.sizeSection}>
            <div className={styles.sizeHeader}>
              <span className={styles.sizeLabel}>Size</span>
              <button className={styles.sizeGuide}>Size Guide</button>
            </div>
            <div className={styles.sizeGrid}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`${styles.sizeOption} ${selectedSize === size ? styles.sizeOptionActive : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Bag */}
          <button
            className={styles.addToBag}
            onClick={handleAddToCart}
            disabled={!selectedSize}
          >
            {selectedSize ? 'Add to Bag' : 'Select a Size'}
          </button>

          {/* Shipping Info */}
          <div className={styles.shippingInfo}>
            <div className={styles.shippingItem}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 4l7-3 7 3v8l-7 3-7-3V4Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M1 4l7 3m0 0l7-3M8 7v8" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              <span>Complimentary shipping over $200</span>
            </div>
            <div className={styles.shippingItem}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M13.5 6.5C13.5 10.5 8 14.5 8 14.5S2.5 10.5 2.5 6.5a5.5 5.5 0 0 1 11 0Z" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="8" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              <span>Made in Italy</span>
            </div>
          </div>

          {/* Details Tabs */}
          <div className={styles.detailsSection}>
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${activeTab === 'details' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Product Details
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'fabric' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('fabric')}
              >
                Fabric &amp; Care
              </button>
            </div>
            <div className={styles.tabContent}>
              {activeTab === 'details' ? (
                <ul className={styles.detailsList}>
                  {product.details.map((detail, i) => (
                    <li key={i} className={styles.detailItem}>{detail}</li>
                  ))}
                </ul>
              ) : (
                <ul className={styles.detailsList}>
                  {product.fabricCare.map((item, i) => (
                    <li key={i} className={styles.detailItem}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      {recommendations.length > 0 && (
        <section className={styles.recommendations}>
          <h2 className={styles.recTitle}>You May Also Like</h2>
          <div className={styles.recGrid}>
            {recommendations.map((rec) => (
              <Link
                key={rec.id}
                href={`/product/${rec.slug}`}
                className={styles.recCard}
              >
                <div className={styles.recImageWrap}>
                  <div className={styles.recImage} />
                  {rec.isNew && <span className={styles.recBadge}>New</span>}
                </div>
                <div className={styles.recInfo}>
                  <span className={styles.recName}>{rec.name}</span>
                  <span className={styles.recPrice}>
                    ${rec.price.toLocaleString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h1 className={styles.notFoundTitle}>Product Not Found</h1>
          <p className={styles.notFoundText}>
            The product you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/shop" className={styles.notFoundLink}>
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}
