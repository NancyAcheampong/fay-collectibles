'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import styles from './BottomNav.module.css';

function HomeIcon({ filled }: { filled: boolean }) {
  return filled ? (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 10.5V20h6v-6h4v6h6V10.5L12 3 4 10.5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 10.5V20h6v-6h4v6h6V10.5L12 3 4 10.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShopIcon({ filled }: { filled: boolean }) {
  return filled ? (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1.5" fill="currentColor" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" fill="currentColor" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" fill="currentColor" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" fill="currentColor" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 7h14l-1.5 12h-11L5 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 7V6a3 3 0 0 1 6 0v1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AccountIcon({ filled }: { filled: boolean }) {
  return filled ? (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" fill="currentColor" />
      <path
        d="M4 21c0-4 3.6-7 8-7s8 3 8 7"
        fill="currentColor"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4 21c0-4 3.6-7 8-7s8 3 8 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BottomNav() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { isAuthenticated } = useAuth();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const homeActive = isActive('/');
  const shopActive = isActive('/shop');
  const accountActive =
    isActive('/signin') || isActive('/register') || isActive('/account');

  return (
    <nav className={styles.bottomNav} aria-label="Mobile navigation">
      <div className={styles.inner}>
        {/* Home */}
        <Link
          href="/"
          className={`${styles.tab} ${homeActive ? styles.tabActive : ''}`}
          aria-label="Home"
        >
          <span className={styles.tabIcon}>
            <HomeIcon filled={homeActive} />
          </span>
          <span className={styles.tabLabel}>Home</span>
        </Link>

        {/* Shop */}
        <Link
          href="/shop"
          className={`${styles.tab} ${shopActive ? styles.tabActive : ''}`}
          aria-label="Shop"
        >
          <span className={styles.tabIcon}>
            <ShopIcon filled={shopActive} />
          </span>
          <span className={styles.tabLabel}>Shop</span>
        </Link>

        {/* Bag */}
        <button
          className={styles.tab}
          onClick={openCart}
          aria-label={`Shopping bag, ${itemCount} items`}
        >
          <span className={styles.tabIcon}>
            <BagIcon />
            {itemCount > 0 && (
              <span className={styles.tabBadge}>{itemCount}</span>
            )}
          </span>
          <span className={styles.tabLabel}>Bag</span>
        </button>

        {/* Account */}
        <Link
          href={isAuthenticated ? '/account' : '/signin'}
          className={`${styles.tab} ${accountActive ? styles.tabActive : ''}`}
          aria-label="Account"
        >
          <span className={styles.tabIcon}>
            <AccountIcon filled={accountActive} />
          </span>
          <span className={styles.tabLabel}>Account</span>
        </Link>
      </div>
    </nav>
  );
}
