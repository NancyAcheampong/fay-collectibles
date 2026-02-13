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
        <div className={styles.heroPattern} aria-hidden="true" />
        <div className={styles.heroContent}>
          <img
            src="/brand/logo-white.svg"
            alt="FAY"
            className={styles.heroLogo}
          />
          <h1 className={styles.heroTitle}>Wear Confidence</h1>
          <Link href="/shop" className={styles.heroLink}>
            Discover the Collection
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
        <div className={styles.heroScroll} aria-hidden="true">
          <span>Scroll</span>
          <div className={styles.heroScrollLine} />
        </div>
      </section>

      {/* ============================================
         Featured Products
         ============================================ */}
      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>New Arrivals</h2>
          <p className={styles.sectionSubtitle}>Same confidence.</p>
        </div>

        <div className={styles.productGrid}>
          {displayProducts.map((product) => (
            <Link
              key={product.id}
              href={`/shop`}
              className={styles.productCard}
            >
              <div className={styles.productImageWrap}>
                <div className={styles.productImage}>
                  <div className={styles.productImagePattern} aria-hidden="true" />
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
          <Link href="/shop" className={styles.ctaLink}>
            View All
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
      </section>

      {/* ============================================
         Brand Ethos
         ============================================ */}
      <section className={styles.ethos}>
        <div className={styles.ethosPattern} aria-hidden="true" />
        <div className={styles.ethosInner}>
          <div className={styles.ethosText}>
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
              About FAY
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
          <div className={styles.ethosVisual}>
            <img
              src="/brand/pattern-secondary.svg"
              alt=""
              className={styles.ethosVisualImg}
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      {/* ============================================
         Collections
         ============================================ */}
      <section className={styles.collections}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Collections</h2>
        </div>

        <div className={styles.collectionsGrid}>
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/shop?collection=${collection.slug}`}
              className={styles.collectionCard}
            >
              <div className={styles.collectionInner}>
                <div
                  className={styles.collectionPattern}
                  aria-hidden="true"
                />
                <div className={styles.collectionContent}>
                  <h3 className={styles.collectionName}>{collection.name}</h3>
                  <p className={styles.collectionDesc}>
                    {collection.description}
                  </p>
                  <span className={styles.collectionLink}>
                    Explore
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 6h8M7 3l3 3-3 3"
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
        <img
          src="/brand/brand-sign.svg"
          alt="FAY"
          className={styles.editorialSign}
        />
        <p className={styles.editorialText}>
          Designed to be worn. Styled to be remembered.
        </p>
      </section>

      {/* ============================================
         Newsletter
         ============================================ */}
      <section className={styles.newsletter}>
        <div className={styles.newsletterPattern} aria-hidden="true" />
        <div className={styles.newsletterInner}>
          <h2 className={styles.newsletterTitle}>Stay Informed</h2>
          <p className={styles.newsletterDesc}>
            New arrivals, exclusive access, and considered style.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
