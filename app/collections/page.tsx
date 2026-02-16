import type { Metadata } from 'next';
import Link from 'next/link';
import { getProductsByCollection } from '@/lib/products';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Collections | FAY Collectibles',
  description:
    'Explore FAY Collectibles curated collections. From timeless essentials to seasonal pieces and curated edits.',
};

const collections = [
  {
    name: 'The Essentials',
    slug: 'the-essentials',
    tagline: 'Timeless. Foundational. Forever.',
    description:
      'The backbone of every considered wardrobe. These are the pieces you reach for first and retire last — crafted from the finest natural fabrics and designed with enduring proportions that transcend seasons.',
    filter: 'The Essentials' as const,
  },
  {
    name: 'New Season',
    slug: 'new-season',
    tagline: 'Current mood. Elevated.',
    description:
      'A refined interpretation of the current moment. Each New Season collection introduces fresh silhouettes and textures while maintaining the quiet confidence that defines FAY. Contemporary without being disposable.',
    filter: 'New Season' as const,
  },
  {
    name: 'The Edit',
    slug: 'the-edit',
    tagline: 'Curated. Considered. Complete.',
    description:
      'Our most intentional offering. The Edit is a tightly curated selection of statement pieces that complete a wardrobe. Each piece is chosen for its ability to elevate — from structured totes to tailored trousers with distinctive character.',
    filter: 'The Edit' as const,
  },
];

export default function CollectionsPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <ol className={styles.breadcrumbList}>
            <li className={styles.breadcrumbItem}>
              <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            </li>
            <li className={styles.breadcrumbSep} aria-hidden="true">/</li>
            <li className={styles.breadcrumbItem}>
              <span className={styles.breadcrumbCurrent} aria-current="page">
                Collections
              </span>
            </li>
          </ol>
        </nav>
        <h1 className={styles.title}>Collections</h1>
        <p className={styles.subtitle}>
          Three distinct perspectives on modern luxury. Each collection is
          designed with intention — a wardrobe, not a catalogue.
        </p>
      </section>

      {/* Collection Cards */}
      <section className={styles.collectionsSection}>
        {collections.map((collection, index) => {
          const products = getProductsByCollection(collection.filter);
          const productCount = products.length;
          const priceRange = products.length > 0
            ? `$${Math.min(...products.map((p) => p.price))} — $${Math.max(...products.map((p) => p.price))}`
            : '';

          return (
            <div key={collection.slug} className={styles.collectionBlock}>
              <div className={styles.collectionImage}>
                <div className={styles.collectionImagePlaceholder} />
              </div>
              <div className={styles.collectionInfo}>
                <span className={styles.collectionNumber}>0{index + 1}</span>
                <h2 className={styles.collectionName}>{collection.name}</h2>
                <p className={styles.collectionTagline}>{collection.tagline}</p>
                <p className={styles.collectionDesc}>{collection.description}</p>
                <div className={styles.collectionMeta}>
                  <span className={styles.metaItem}>
                    {productCount} {productCount === 1 ? 'piece' : 'pieces'}
                  </span>
                  {priceRange && (
                    <>
                      <span className={styles.metaDot} />
                      <span className={styles.metaItem}>{priceRange}</span>
                    </>
                  )}
                </div>
                <Link
                  href={`/shop?collection=${collection.slug}`}
                  className={styles.collectionLink}
                >
                  Explore Collection
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom CTA */}
      <section className={styles.bottomCta}>
        <h2 className={styles.bottomCtaTitle}>View All Products</h2>
        <p className={styles.bottomCtaDesc}>
          Browse our complete range across all collections.
        </p>
        <Link href="/shop" className={styles.bottomCtaButton}>
          Shop All
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>
    </div>
  );
}
