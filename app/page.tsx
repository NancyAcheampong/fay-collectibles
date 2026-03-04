import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProducts, getNewArrivals } from '@/lib/products';
import { NewsletterForm } from '@/components/ui/NewsletterForm';
import { HeroCarousel } from '@/components/ui/HeroCarousel';
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

const testimonials = [
  {
    name: 'Amara K.',
    image: '/images/reviews/avatar-1.jpg',
    product: 'Wool Blend Overcoat',
    text: 'The quality is absolutely exceptional. I\'ve never owned a coat that feels this luxurious yet wears so effortlessly. The tailoring is impeccable — every detail has been considered.',
  },
  {
    name: 'Sophie M.',
    image: '/images/reviews/avatar-4.jpg',
    product: 'Leather Structured Tote',
    text: 'This bag is stunning in person. The leather has a beautiful weight to it and the stitching is flawless. It fits everything I need for work and still looks effortlessly chic.',
  },
  {
    name: 'Marcus W.',
    image: '/images/reviews/avatar-2.jpg',
    product: 'Wool Blend Overcoat',
    text: 'Excellent coat. The fit is sharp and the construction is solid — you can tell this is built to last. I sized up for layering and it works perfectly over a jumper.',
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
         Hero — Full-screen carousel with text overlay
         ============================================ */}
      <section className={styles.hero}>
        <HeroCarousel />
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
              href={`/product/${product.slug}`}
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
              href={`/collections`}
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
         Testimonials
         ============================================ */}
      <section className={styles.testimonials}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Customer Love</span>
          <h2 className={styles.sectionTitle}>What People Are Saying</h2>
        </div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((t) => (
            <div key={t.name} className={styles.testimonialCard}>
              <div className={styles.testimonialStars} aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path
                      d="M8 1.5l1.85 3.75 4.15.6-3 2.93.71 4.12L8 10.77 4.29 12.9l.71-4.12-3-2.93 4.15-.6L8 1.5z"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinejoin="round"
                    />
                  </svg>
                ))}
              </div>
              <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
              <div className={styles.testimonialAuthor}>
                <Image
                  src={t.image}
                  alt={t.name}
                  width={36}
                  height={36}
                  className={styles.testimonialAvatar}
                />
                <div className={styles.testimonialInfo}>
                  <span className={styles.testimonialName}>{t.name}</span>
                  <span className={styles.testimonialProduct}>{t.product}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.sectionCta}>
          <Link href="/reviews" className={styles.ctaButton}>
            Read All Reviews
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ============================================
         Wholesale
         ============================================ */}
      <section className={styles.wholesale}>
        <div className={styles.wholesaleInner}>
          <div className={styles.wholesaleText}>
            <span className={styles.wholesaleLabel}>Trade Programme</span>
            <h2 className={styles.wholesaleTitle}>Partner With FAY</h2>
            <p className={styles.wholesaleBody}>
              Bring FAY to your boutique, retail space, or styling studio.
              We partner with select stockists who share our commitment to
              quality and intentional design.
            </p>
            <a href="mailto:wholesale@faycollectibles.com" className={styles.wholesaleCta}>
              <span>Enquire Now</span>
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
            </a>
          </div>
          <div className={styles.wholesaleFeatures}>
            <div className={styles.wholesaleFeature}>
              <span className={styles.wholesaleFeatureTitle}>Minimum Order</span>
              <span className={styles.wholesaleFeatureDesc}>
                Low MOQs designed for independent retailers and boutiques.
              </span>
            </div>
            <div className={styles.wholesaleFeature}>
              <span className={styles.wholesaleFeatureTitle}>Dedicated Support</span>
              <span className={styles.wholesaleFeatureDesc}>
                A personal account manager from first order to restock.
              </span>
            </div>
            <div className={styles.wholesaleFeature}>
              <span className={styles.wholesaleFeatureTitle}>Brand Assets</span>
              <span className={styles.wholesaleFeatureDesc}>
                Lookbook imagery, copy, and merchandising guidance included.
              </span>
            </div>
          </div>
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
