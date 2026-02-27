import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service | FAY Collectibles',
  description:
    'Read the terms and conditions that govern your use of the FAY Collectibles website and services.',
};

export default function TermsOfServicePage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Legal</span>
          <h1 className={styles.heroTitle}>Terms of Service</h1>
          <p className={styles.heroDesc}>
            Please read these terms carefully before using our website or making a
            purchase. By accessing FAY Collectibles, you agree to be bound by these
            terms and conditions.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>General</h2>
            <p className={styles.sectionText}>
              These Terms of Service govern your use of the FAY Collectibles
              website and all related services. By placing an order, creating an
              account, or browsing our site, you acknowledge that you have read,
              understood, and agree to these terms. We reserve the right to update
              these terms at any time without prior notice.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Products &amp; Pricing</h2>
            <p className={styles.sectionText}>
              We make every effort to display our products accurately, including
              colours, materials, and sizing. However, slight variations may occur
              due to screen settings and manufacturing processes. All prices are
              listed in the currency displayed at checkout and are subject to change
              without notice. Prices do not include shipping or applicable taxes
              unless otherwise stated.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Orders &amp; Payment</h2>
            <p className={styles.sectionText}>
              When you place an order, you are making an offer to purchase. We
              reserve the right to accept or decline any order. Payment is required
              at the time of purchase. We accept major credit cards, debit cards,
              and other payment methods as displayed at checkout. All transactions
              are processed securely.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Shipping &amp; Delivery</h2>
            <p className={styles.sectionText}>
              We aim to dispatch all orders within 1&ndash;3 business days.
              Delivery times vary depending on your location and chosen shipping
              method. FAY Collectibles is not responsible for delays caused by
              customs, postal services, or other circumstances beyond our control.
              Risk of loss passes to you upon delivery.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Intellectual Property</h2>
            <p className={styles.sectionText}>
              All content on this website &mdash; including text, images, logos,
              graphics, and design &mdash; is the property of FAY Collectibles and
              is protected by copyright and trademark laws. You may not reproduce,
              distribute, or use any content from this site without our prior
              written consent.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Account Responsibilities</h2>
            <p className={styles.sectionText}>
              If you create an account, you are responsible for maintaining the
              confidentiality of your login credentials and for all activity that
              occurs under your account. You agree to notify us immediately of any
              unauthorised use. We reserve the right to suspend or terminate
              accounts that violate these terms.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Limitation of Liability</h2>
            <p className={styles.sectionText}>
              To the fullest extent permitted by law, FAY Collectibles shall not be
              liable for any indirect, incidental, or consequential damages arising
              from your use of our website or products. Our total liability shall
              not exceed the amount you paid for the relevant order.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Governing Law</h2>
            <p className={styles.sectionText}>
              These terms are governed by and construed in accordance with
              applicable laws. Any disputes arising from these terms or your use of
              our services shall be subject to the exclusive jurisdiction of the
              relevant courts.
            </p>
          </div>

          <p className={styles.lastUpdated}>Last updated: February 2026</p>
        </div>
      </div>
    </div>
  );
}
