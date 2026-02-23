'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './account.module.css';

const accountNav = [
  { label: 'Overview', href: '/account' },
  { label: 'My Orders', href: '/account/orders' },
  { label: 'My Details', href: '/account/details' },
  { label: 'Address Book', href: '/account/addresses' },
  { label: 'Wishlist', href: '/account/wishlist' },
  { label: 'Settings', href: '/account/settings' },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className={styles.accountPage}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>My Account</span>
        </nav>

        <div className={styles.accountGrid}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarGreeting}>
              <p className={styles.greetingLabel}>My Account</p>
            </div>
            <nav className={styles.sidebarNav} aria-label="Account navigation">
              {accountNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${
                    pathname === item.href ? styles.navLinkActive : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className={styles.navDivider} />
              <button className={styles.signOutBtn}>Sign Out</button>
            </nav>
          </aside>

          {/* Content */}
          <main className={styles.content}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
