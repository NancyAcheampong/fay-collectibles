import Link from 'next/link';
import { getFeaturedProducts, getNewArrivals } from '@/lib/products';
import { NewsletterForm } from '@/components/ui/NewsletterForm';
import styles from './page.module.css';

const collections = [
  {
    name: 'The Essentials',
    slug: 'the-essentials',
    description: 'Timeless foundations built to last.',
  },
  {
    name: 'New Season',
    slug: 'new-season',
    description: 'Current mood. Elevated essentials.',
  },
  {
    name: 'The Edit',
    slug: 'the-edit',
    description: 'Curated. Considered. Complete.',
  },
];

const marqueeItems = [
  'Crafted with Intent',
  'Made in Italy',
  'Quiet Luxury',
  'Timeless Design',
  'Premium Materials',
  'Wear Confidence',
];

export default function Home() {
  const featured = getFeaturedProducts().slice(0, 4);
  const newArrivals = getNewArrivals().slice(0, 4);
  const displayProducts = newArrivals.length >= 4 ? newArrivals : featured;

  return (
    <div className={styles.page}>
      {/* ============================================
         Hero
         ============================================ */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.heroSubtitle}>FAY Collectibles</p>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLine}>Wear</span>
            <span className={styles.heroTitleAccent}>Confidence</span>
          </h1>
          <p className={styles.heroDesc}>
            Refined essentials for those who dress with intention.
          </p>
          <Link href="/shop" className={styles.heroCta}>
            <span className={styles.heroCtaText}>Discover the Collection</span>
            <span className={styles.heroCtaIcon}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 10h12M11 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
        <div className={styles.heroScroll} aria-hidden="true">
          <span>Scroll</span>
          <div className={styles.heroScrollLine} />
        </div>
      </section>

      {/* ============================================
         Marquee Band
         ============================================ */}
      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeText}>{item}</span>
              <span className={styles.marqueeDot} />
            </span>
          ))}
        </div>
      </div>

      {/* ============================================
         Featured Products
         ============================================ */}
      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Curated Selection</span>
          <h2 className={styles.sectionTitle}>New Arrivals</h2>
        </div>

        <div className={styles.productGrid}>
          {displayProducts.map((product) => (
            <Link
              key={product.id}
              href={`/shop`}
              className={styles.productCard}
            >
              <div className={styles.productImageWrap}>
                <div className={styles.productImage} />
                <div className={styles.productOverlay}>
                  <span className={styles.productOverlayText}>View Details</span>
                </div>
                {product.isNew && (
                  <span className={styles.productBadge}>New</span>
                )}
              </div>
              <div className={styles.productInfo}>
                <span className={styles.productName}>{product.name}</span>
                <span className={styles.productPrice}>
                  ${product.price.toLocaleString()}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.sectionCta}>
          <Link href="/shop" className={styles.ctaButton}>
            View All Pieces
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
      </section>

      {/* ============================================
         Brand Ethos
         ============================================ */}
      <section className={styles.ethos}>
        <div className={styles.ethosInner}>
          <div className={styles.ethosText}>
            <span className={styles.ethosLabel}>Our Philosophy</span>
            <p className={styles.ethosHeadline}>
              Less noise.<br />
              More presence.
            </p>
            <p className={styles.ethosBody}>
              FAY is a modern fashion house crafting refined, everyday
              essentials for those who dress with intention. Quality fabrics,
              precise construction, quiet confidence.
            </p>
            <Link href="/about" className={styles.ethosLink}>
              <span>About FAY</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 7h10M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
          <div className={styles.ethosMetrics}>
            <div className={styles.metric}>
              <span className={styles.metricValue}>100%</span>
              <span className={styles.metricLabel}>Premium fabrics</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricValue}>12</span>
              <span className={styles.metricLabel}>Curated pieces</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricValue}>3</span>
              <span className={styles.metricLabel}>Collections</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
         Collections
         ============================================ */}
      <section className={styles.collections}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Explore</span>
          <h2 className={styles.sectionTitle}>Collections</h2>
        </div>

        <div className={styles.collectionsGrid}>
          {collections.map((collection, index) => (
            <Link
              key={collection.slug}
              href={`/shop?collection=${collection.slug}`}
              className={`${styles.collectionCard} ${index === 0 ? styles.collectionCardLarge : ''}`}
            >
              <div className={styles.collectionInner}>
                <div className={styles.collectionContent}>
                  <span className={styles.collectionNumber}>0{index + 1}</span>
                  <h3 className={styles.collectionName}>{collection.name}</h3>
                  <p className={styles.collectionDesc}>
                    {collection.description}
                  </p>
                  <span className={styles.collectionLink}>
                    Explore
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 7h10M8 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================
         Editorial Band
         ============================================ */}
      <section className={styles.editorial}>
        <div className={styles.editorialInner}>
          <img
            src="/brand/brand-sign.svg"
            alt="FAY"
            className={styles.editorialSign}
          />
          <p className={styles.editorialText}>
            Designed to be worn. Styled to be remembered.
          </p>
        </div>
      </section>

      {/* ============================================
         Newsletter
         ============================================ */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterInner}>
          <span className={styles.newsletterLabel}>Stay Connected</span>
          <h2 className={styles.newsletterTitle}>Join the Inner Circle</h2>
          <p className={styles.newsletterDesc}>
            New arrivals, exclusive access, and considered style &mdash; delivered directly.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
