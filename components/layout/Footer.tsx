import Link from 'next/link';
import styles from './Footer.module.css';

const shopLinks = [
  { label: 'New Arrivals', href: '/shop?filter=new' },
  { label: 'The Essentials', href: '/shop?collection=the-essentials' },
  { label: 'New Season', href: '/shop?collection=new-season' },
  { label: 'The Edit', href: '/shop?collection=the-edit' },
  { label: 'All Products', href: '/shop' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'Sustainability', href: '/about' },
  { label: 'Careers', href: '/about' },
];

const helpLinks = [
  { label: 'Contact', href: '/help' },
  { label: 'Shipping & Returns', href: '/help' },
  { label: 'Size Guide', href: '/help' },
  { label: 'FAQs', href: '/help' },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <img
              src="/brand/logo-white.svg"
              alt="FAY"
              className={styles.logo}
            />
            <p className={styles.tagline}>Wear Confidence</p>
          </div>

          <div className={styles.columns}>
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>Shop</h3>
              <ul className={styles.columnList}>
                {shopLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.columnLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>Company</h3>
              <ul className={styles.columnList}>
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.columnLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>Help</h3>
              <ul className={styles.columnList}>
                {helpLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.columnLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} FAY Collectibles
          </p>
          <div className={styles.legal}>
            <Link href="/help" className={styles.legalLink}>
              Privacy Policy
            </Link>
            <Link href="/help" className={styles.legalLink}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.patternOverlay} aria-hidden="true" />
    </footer>
  );
}
