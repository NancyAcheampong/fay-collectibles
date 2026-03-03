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
  { label: 'Reviews', href: '/reviews' },
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
    href: 'https://www.instagram.com/faycollectibles?igsh=eGw5a3JhOW9pOWYw',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@faycollectibles?_r=1&_t=ZM-92oZx2uBD6x',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M16.6 5.82A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Snapchat',
    href: 'https://www.snapchat.com/add/faycollectibles',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12.166 3c1.672 0 3.156.855 4.078 2.353.54.878.665 2.424.513 3.774a.335.335 0 0 0 .183.345c.322.16.652.27.982.33.39.07.665.13.89.33.27.24.293.555.073.84-.33.42-.908.57-1.46.714-.18.047-.36.094-.517.153-.397.15-.485.31-.498.388.02.193.222.455.6.78.753.645 1.705 1.08 2.116 1.597.28.35.338.717.173 1.094-.18.41-.584.68-1.125.754-.286.04-.578.037-.862.034h-.124c-.233.003-.405.095-.538.283a5.06 5.06 0 0 1-.987 1.02c-.88.68-1.88 1.01-2.98 1.01h-.075c-1.098 0-2.098-.33-2.976-1.008a5.049 5.049 0 0 1-.99-1.023c-.134-.19-.305-.283-.54-.284h-.12c-.285.003-.577.006-.864-.034-.54-.074-.945-.344-1.125-.755-.165-.377-.107-.744.174-1.094.41-.517 1.362-.952 2.115-1.596.378-.326.58-.588.6-.78-.012-.08-.1-.24-.498-.39a6.622 6.622 0 0 0-.517-.152c-.552-.144-1.13-.294-1.46-.715-.22-.285-.196-.6.074-.84.225-.2.5-.26.89-.33.33-.06.66-.17.98-.33a.335.335 0 0 0 .184-.345c-.153-1.35-.028-2.896.512-3.774C9.01 3.855 10.494 3 12.166 3Z" stroke="currentColor" strokeWidth="1.5" />
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
