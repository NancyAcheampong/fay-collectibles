import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Refund Policy | FAY Collectibles',
  description:
    'Learn about our returns, exchanges, and refund process at FAY Collectibles.',
};

export default function RefundPolicyPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Customer Care</span>
          <h1 className={styles.heroTitle}>Refund Policy</h1>
          <p className={styles.heroDesc}>
            We want you to love every piece you purchase. If something isn&apos;t
            right, we&apos;re here to help with returns, exchanges, and refunds.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Return Window</h2>
            <p className={styles.sectionText}>
              We accept returns within 14 days of delivery. Items must be unworn,
              unwashed, and in their original condition with all tags attached. Sale
              items and personalised products are final sale and cannot be returned.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>How to Initiate a Return</h2>
            <p className={styles.sectionText}>
              To start a return, please contact our customer care team at
              support@faycollectibles.com with your order number and reason for
              return. We will provide you with a return authorisation and shipping
              instructions. Please do not send items back without prior
              authorisation.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Return Conditions</h2>
            <p className={styles.sectionText}>
              To be eligible for a refund, returned items must meet the following
              conditions:
            </p>
            <ul className={styles.sectionList}>
              <li>Unworn, unwashed, and free from stains, odours, or damage</li>
              <li>All original tags and labels must be attached</li>
              <li>Items must be in their original packaging</li>
              <li>Proof of purchase is required</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Exchanges</h2>
            <p className={styles.sectionText}>
              We offer exchanges for different sizes or colours, subject to
              availability. To request an exchange, follow the same return process
              and specify the item you would like instead. If the requested item is
              unavailable, we will issue a full refund.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Refund Processing</h2>
            <p className={styles.sectionText}>
              Once we receive and inspect your return, we will notify you by email.
              Approved refunds are processed to your original payment method within
              5&ndash;10 business days. Please note that your bank or payment
              provider may take additional time to reflect the refund in your
              account.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Return Shipping</h2>
            <p className={styles.sectionText}>
              Return shipping costs are the responsibility of the customer unless
              the item is defective or we made an error with your order. We
              recommend using a tracked shipping service, as we cannot be
              responsible for items lost in transit.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Damaged or Defective Items</h2>
            <p className={styles.sectionText}>
              If you receive a damaged or defective item, please contact us within
              48 hours of delivery with photographs of the issue. We will arrange a
              free return and offer a replacement or full refund at your preference.
            </p>
          </div>

          <p className={styles.lastUpdated}>Last updated: February 2026</p>
        </div>
      </div>
    </div>
  );
}
