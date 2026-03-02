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
];

const helpLinks = [
  { label: 'Contact', href: '/faqs' },
  { label: 'Shipping & Returns', href: '/refund-policy' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Refund Policy', href: '/refund-policy' },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 21 10.548 13.4M21 3l-7.548 7.6M10.548 13.4 3 3h5.4l5.052 6.6M10.548 13.4 16.6 21H21l-7.548-10.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Pinterest',
    href: 'https://pinterest.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.087-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.805-2.424 1.808-2.424.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.996.499 1.806 1.48 1.806 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.134-4.515 4.34 0 .859.331 1.781.745 2.282a.3.3 0 0 1 .069.288l-.278 1.133c-.044.183-.146.222-.337.134-1.254-.584-2.038-2.416-2.038-3.888 0-3.168 2.302-6.078 6.637-6.078 3.485 0 6.194 2.484 6.194 5.806 0 3.461-2.183 6.25-5.214 6.25-1.018 0-1.976-.53-2.303-1.155l-.626 2.387c-.226.874-.838 1.968-1.246 2.636A10.003 10.003 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M16.6 5.82A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z" fill="currentColor" />
      </svg>
    ),
  },
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
            <div className={styles.socials}>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={styles.socialLink}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
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
            <Link href="/privacy" className={styles.legalLink}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={styles.legalLink}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
