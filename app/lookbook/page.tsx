import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Lookbook | FAY Collectibles',
  description:
    'Explore the FAY Collectibles lookbook. Editorial imagery and styled looks from our latest collections.',
};

const looks = [
  {
    id: 1,
    title: 'The Architecture of Dressing',
    description:
      'Structure meets fluidity. A study in how sharp tailoring and relaxed silhouettes create a dialogue when worn together.',
    products: ['Structured Wool Overcoat', 'Tailored Wide-Leg Trouser'],
    layout: 'full' as const,
  },
  {
    id: 2,
    title: 'Morning Light',
    description:
      'The ease of a silk blend shirt paired with clean tailoring. An outfit that moves seamlessly from desk to dinner.',
    products: ['Silk Blend Relaxed Shirt', 'Slim Tailored Trouser'],
    layout: 'half' as const,
  },
  {
    id: 3,
    title: 'Texture Play',
    description:
      'Cashmere against smooth leather. The interplay of tactile surfaces elevates even the simplest look.',
    products: ['Cashmere Half-Zip Knit', 'Leather Structured Tote'],
    layout: 'half' as const,
  },
  {
    id: 4,
    title: 'New Foundations',
    description:
      'The modern uniform, reimagined. A blazer that commands attention paired with essentials that let the construction speak.',
    products: ['Double-Breasted Blazer', 'Ribbed Knit Tank', 'Draped Midi Skirt'],
    layout: 'full' as const,
  },
  {
    id: 5,
    title: 'The Art of Less',
    description:
      'A single tee, perfectly made. When the fabric and the cut are right, nothing else is needed.',
    products: ['Oversized Cotton Tee', 'Leather Minimal Belt'],
    layout: 'half' as const,
  },
  {
    id: 6,
    title: 'Winter Layers',
    description:
      'Warmth as an art form. Wool, cashmere, and leather compose a palette of textures for the cooler months.',
    products: ['Wool Cashmere Scarf', 'Structured Wool Overcoat'],
    layout: 'half' as const,
  },
];

export default function LookbookPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Lookbook — 2025</span>
          <h1 className={styles.heroTitle}>
            Dressed with<br />
            Intention
          </h1>
          <p className={styles.heroDesc}>
            An editorial exploration of how FAY pieces come together.
            Six styled looks that demonstrate the versatility and quiet
            authority of considered dressing.
          </p>
        </div>
      </section>

      {/* Looks */}
      <section className={styles.looks}>
        {looks.map((look, index) => (
          <div
            key={look.id}
            className={`${styles.look} ${look.layout === 'full' ? styles.lookFull : styles.lookHalf}`}
          >
            {look.layout === 'full' ? (
              <>
                <div className={styles.lookImageFull}>
                  <div className={styles.lookImagePlaceholder} />
                </div>
                <div className={styles.lookContent}>
                  <span className={styles.lookNumber}>Look {String(index + 1).padStart(2, '0')}</span>
                  <h2 className={styles.lookTitle}>{look.title}</h2>
                  <p className={styles.lookDesc}>{look.description}</p>
                  <div className={styles.lookProducts}>
                    <span className={styles.lookProductsLabel}>Featured Pieces</span>
                    {look.products.map((product) => (
                      <span key={product} className={styles.lookProduct}>
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.lookImageHalf}>
                  <div className={styles.lookImagePlaceholder} />
                </div>
                <div className={styles.lookContent}>
                  <span className={styles.lookNumber}>Look {String(index + 1).padStart(2, '0')}</span>
                  <h2 className={styles.lookTitle}>{look.title}</h2>
                  <p className={styles.lookDesc}>{look.description}</p>
                  <div className={styles.lookProducts}>
                    <span className={styles.lookProductsLabel}>Featured Pieces</span>
                    {look.products.map((product) => (
                      <span key={product} className={styles.lookProduct}>
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Shop the Looks</h2>
          <p className={styles.ctaDesc}>
            Every piece featured in our lookbook is available now.
          </p>
          <Link href="/shop" className={styles.ctaButton}>
            Shop Now
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
