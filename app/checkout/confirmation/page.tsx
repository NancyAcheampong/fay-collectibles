import Link from 'next/link';
import styles from './confirmation.module.css';

export const metadata = {
  title: 'Order Confirmed — FAY Collectibles',
};

export default function ConfirmationPage() {
  const orderNumber = `FAY-${new Date().getFullYear()}${String(Math.floor(Math.random() * 9000) + 1000)}`;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="27" stroke="currentColor" strokeWidth="1.5" />
            <path d="M18 28l7 7 13-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className={styles.title}>Thank You</h1>
        <p className={styles.subtitle}>Your order has been placed successfully.</p>

        <div className={styles.orderInfo}>
          <div className={styles.orderRow}>
            <span className={styles.orderLabel}>Order Number</span>
            <span className={styles.orderValue}>{orderNumber}</span>
          </div>
          <div className={styles.orderRow}>
            <span className={styles.orderLabel}>Status</span>
            <span className={styles.orderBadge}>Processing</span>
          </div>
        </div>

        <p className={styles.message}>
          We&apos;ve sent a confirmation email with your order details. You&apos;ll receive a shipping notification once your order is on its way.
        </p>

        <div className={styles.actions}>
          <Link href="/shop" className={styles.primaryBtn}>
            Continue Shopping
          </Link>
          <Link href="/" className={styles.secondaryBtn}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
