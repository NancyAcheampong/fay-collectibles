import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Reviews | FAY Collectibles',
  description:
    'See what our customers are saying about FAY Collectibles. Real reviews from real people who dress with intention.',
};

const reviews = [
  {
    name: 'Amara K.',
    initials: 'AK',
    location: 'London, UK',
    rating: 5,
    date: 'February 2025',
    product: 'Wool Blend Overcoat',
    text: 'The quality is absolutely exceptional. I\'ve never owned a coat that feels this luxurious yet wears so effortlessly. The tailoring is impeccable — every detail has been considered. Worth every penny.',
  },
  {
    name: 'Daniel R.',
    initials: 'DR',
    location: 'Manchester, UK',
    rating: 5,
    date: 'January 2025',
    product: 'Cashmere Crew Neck',
    text: 'I was sceptical about buying knitwear online, but the size guide was spot on. The cashmere is incredibly soft and the fit is exactly what I wanted — relaxed but structured. Already ordering a second.',
  },
  {
    name: 'Sophie M.',
    initials: 'SM',
    location: 'Birmingham, UK',
    rating: 5,
    date: 'January 2025',
    product: 'Leather Structured Tote',
    text: 'This bag is stunning in person. The leather has a beautiful weight to it and the stitching is flawless. It fits everything I need for work and still looks effortlessly chic. My favourite purchase this year.',
  },
  {
    name: 'James T.',
    initials: 'JT',
    location: 'Edinburgh, UK',
    rating: 4,
    date: 'December 2024',
    product: 'Relaxed Tailored Trousers',
    text: 'Great fit and beautiful fabric. The drape is exactly like the photos. I wear these to the office and on weekends — they\'re that versatile. Shipping was quick too.',
  },
  {
    name: 'Priya N.',
    initials: 'PN',
    location: 'Leeds, UK',
    rating: 5,
    date: 'December 2024',
    product: 'Merino Knit Polo',
    text: 'FAY has become my go-to for elevated basics. This polo is lightweight, breathable, and looks far more expensive than it is. The minimal branding is exactly my style. Packaging was beautiful as well.',
  },
  {
    name: 'Oliver H.',
    initials: 'OH',
    location: 'Bristol, UK',
    rating: 5,
    date: 'November 2024',
    product: 'Cotton Twill Overshirt',
    text: 'Bought this as a layering piece and it\'s become the most worn item in my wardrobe. The cotton is substantial without being heavy, and the colour is rich and true to the product images.',
  },
  {
    name: 'Chioma A.',
    initials: 'CA',
    location: 'London, UK',
    rating: 5,
    date: 'November 2024',
    product: 'Silk Blend Scarf',
    text: 'I gifted this to my partner and he absolutely loves it. The silk blend feels premium and the neutral tone goes with everything. The presentation box made it feel really special.',
  },
  {
    name: 'Marcus W.',
    initials: 'MW',
    location: 'Glasgow, UK',
    rating: 4,
    date: 'October 2024',
    product: 'Wool Blend Overcoat',
    text: 'Excellent coat. The fit is sharp and the construction is solid — you can tell this is built to last. I sized up for layering and it works perfectly over a jumper. Highly recommend.',
  },
];

const stats = {
  average: 4.9,
  total: 128,
  breakdown: [
    { stars: 5, percentage: 87 },
    { stars: 4, percentage: 10 },
    { stars: 3, percentage: 2 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 0 },
  ],
};

function Stars({ count }: { count: number }) {
  return (
    <span className={styles.stars} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill={i < count ? 'currentColor' : 'none'}
          aria-hidden="true"
        >
          <path
            d="M8 1.5l1.85 3.75 4.15.6-3 2.93.71 4.12L8 10.77 4.29 12.9l.71-4.12-3-2.93 4.15-.6L8 1.5z"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  );
}

export default function ReviewsPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Customer Reviews</span>
          <h1 className={styles.heroTitle}>What Our Customers Say</h1>
          <p className={styles.heroDesc}>
            Real feedback from real people. See why our community trusts FAY
            Collectibles for refined, everyday essentials.
          </p>
        </div>
      </section>

      {/* Rating Summary */}
      <section className={styles.summary}>
        <div className={styles.summaryInner}>
          <div className={styles.summaryScore}>
            <span className={styles.summaryAverage}>{stats.average}</span>
            <Stars count={5} />
            <span className={styles.summaryCount}>
              Based on {stats.total} reviews
            </span>
          </div>
          <div className={styles.summaryBreakdown}>
            {stats.breakdown.map((row) => (
              <div key={row.stars} className={styles.breakdownRow}>
                <span className={styles.breakdownLabel}>{row.stars} star</span>
                <div className={styles.breakdownBar}>
                  <div
                    className={styles.breakdownFill}
                    style={{ width: `${row.percentage}%` }}
                  />
                </div>
                <span className={styles.breakdownPercent}>
                  {row.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className={styles.reviews}>
        <div className={styles.reviewsInner}>
          {reviews.map((review) => (
            <div key={`${review.name}-${review.date}`} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <Stars count={review.rating} />
                <span className={styles.reviewDate}>{review.date}</span>
              </div>
              <p className={styles.reviewText}>{review.text}</p>
              <div className={styles.reviewFooter}>
                <div className={styles.reviewAuthorRow}>
                  <span className={styles.avatar} aria-hidden="true">
                    {review.initials}
                  </span>
                  <div className={styles.reviewAuthor}>
                    <span className={styles.reviewName}>{review.name}</span>
                    <span className={styles.reviewLocation}>{review.location}</span>
                  </div>
                </div>
                <span className={styles.reviewProduct}>{review.product}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Join Our Community</h2>
          <p className={styles.ctaDesc}>
            Experience the quality that our customers love.
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
