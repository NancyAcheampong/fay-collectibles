'use client';

import Link from 'next/link';
import styles from '../account.module.css';

export default function OrdersPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Orders</h1>
        <p className={styles.subtitle}>
          View and track your recent orders.
        </p>
      </div>

      <nav className={styles.nav}>
        <Link href="/account/orders" className={`${styles.navLink} ${styles.navLinkActive}`}>
          Orders
        </Link>
        <Link href="/account/details" className={styles.navLink}>
          Details
        </Link>
        <Link href="/account/address-book" className={styles.navLink}>
          Addresses
        </Link>
      </nav>

      <div className={styles.empty}>
        <svg className={styles.emptyIcon} viewBox="0 0 56 56" fill="none">
          <rect x="8" y="14" width="40" height="32" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 22h40" stroke="currentColor" strokeWidth="1.5" />
          <path d="M20 10v8M36 10v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M22 30h12M26 36h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <h2 className={styles.emptyTitle}>No orders yet</h2>
        <p className={styles.emptyText}>
          When you place an order, it will appear here so you can track its progress.
        </p>
        <Link href="/shop" className={styles.emptyBtn}>
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
