import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About | FAY Collectibles',
  description:
    'Discover the story behind FAY Collectibles. A modern fashion house crafting refined essentials for those who dress with intention.',
};

const values = [
  {
    number: '01',
    title: 'Intentional Design',
    description:
      'Every piece begins with a question: does this need to exist? We design only what we believe in — refined silhouettes that transcend seasons and resist trends.',
  },
  {
    number: '02',
    title: 'Material First',
    description:
      'We source the finest natural fabrics from heritage mills across Italy, Scotland, and Portugal. The quality of the material is the foundation of every garment.',
  },
  {
    number: '03',
    title: 'Precision Craft',
    description:
      'Our pieces are constructed by skilled artisans using techniques that honour traditional tailoring. Each seam, each stitch, each finish is deliberate.',
  },
  {
    number: '04',
    title: 'Quiet Confidence',
    description:
      'We believe true luxury whispers. Our garments are designed to make the wearer feel exceptional without demanding attention.',
  },
];

const milestones = [
  { year: '2019', text: 'FAY Collectibles founded with a vision for modern quiet luxury.' },
  { year: '2020', text: 'First collection "The Essentials" launches to critical acclaim.' },
  { year: '2021', text: 'Partnership with Italian fabric mills for exclusive material sourcing.' },
  { year: '2022', text: 'Expansion into accessories with the Leather Structured Tote.' },
  { year: '2023', text: '"New Season" collection introduces contemporary seasonal pieces.' },
  { year: '2024', text: '"The Edit" launches as a curated, limited-run series.' },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Our Story</span>
          <h1 className={styles.heroTitle}>
            Built on the belief that less is&nbsp;more.
          </h1>
          <p className={styles.heroDesc}>
            FAY Collectibles is a modern fashion house crafting refined, everyday
            essentials for those who dress with intention. We strip away the
            unnecessary to reveal what matters: quality, precision, and quiet
            confidence.
          </p>
        </div>
      </section>

      {/* Brand Image Band */}
      <section className={styles.imageBand}>
        <div className={styles.imageBandInner}>
          <div className={styles.imageBandLeft}>
            <div className={styles.imagePlaceholder} />
          </div>
          <div className={styles.imageBandRight}>
            <div className={styles.imagePlaceholder} />
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className={styles.philosophy}>
        <div className={styles.philosophyInner}>
          <span className={styles.sectionLabel}>Philosophy</span>
          <div className={styles.philosophyContent}>
            <h2 className={styles.philosophyTitle}>
              We don&apos;t chase trends.
              <br />
              We build wardrobes.
            </h2>
            <p className={styles.philosophyText}>
              Fashion moves fast. We move with purpose. Every FAY piece is
              designed to become a permanent fixture in your wardrobe — not a
              passing moment. Our collections are deliberately small, ruthlessly
              edited, and built to last. We believe that the most sustainable
              garment is the one you wear for years.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.values}>
        <div className={styles.valuesInner}>
          <span className={styles.sectionLabel}>Our Values</span>
          <h2 className={styles.valuesTitle}>What We Stand For</h2>
          <div className={styles.valuesGrid}>
            {values.map((value) => (
              <div key={value.number} className={styles.valueCard}>
                <span className={styles.valueNumber}>{value.number}</span>
                <h3 className={styles.valueName}>{value.title}</h3>
                <p className={styles.valueDesc}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.timeline}>
        <div className={styles.timelineInner}>
          <span className={styles.sectionLabel}>Our Journey</span>
          <h2 className={styles.timelineTitle}>Milestones</h2>
          <div className={styles.timelineList}>
            {milestones.map((milestone) => (
              <div key={milestone.year} className={styles.timelineItem}>
                <span className={styles.timelineYear}>{milestone.year}</span>
                <p className={styles.timelineText}>{milestone.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Experience the Collection</h2>
          <p className={styles.ctaDesc}>
            Explore our curated range of refined essentials.
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
