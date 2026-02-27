import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | FAY Collectibles',
  description:
    'Learn how FAY Collectibles collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Legal</span>
          <h1 className={styles.heroTitle}>Privacy Policy</h1>
          <p className={styles.heroDesc}>
            Your privacy matters to us. This policy outlines how we collect, use,
            and safeguard your personal information when you interact with FAY
            Collectibles.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Information We Collect</h2>
            <p className={styles.sectionText}>
              We collect information you provide directly to us when you create an
              account, make a purchase, subscribe to our newsletter, or contact our
              support team. This may include:
            </p>
            <ul className={styles.sectionList}>
              <li>Name, email address, and phone number</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information (processed securely through our payment providers)</li>
              <li>Order history and preferences</li>
              <li>Communications you send to us</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
            <p className={styles.sectionText}>
              We use the information we collect to provide, maintain, and improve
              our services. Specifically, we use your information to:
            </p>
            <ul className={styles.sectionList}>
              <li>Process and fulfil your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Respond to your enquiries and provide customer support</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our website, products, and services</li>
              <li>Detect and prevent fraud</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Information Sharing</h2>
            <p className={styles.sectionText}>
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information with trusted service providers
              who assist us in operating our website, processing payments, and
              delivering orders. These providers are contractually obligated to
              protect your information.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Cookies &amp; Tracking</h2>
            <p className={styles.sectionText}>
              We use cookies and similar technologies to enhance your browsing
              experience, analyse site traffic, and personalise content. You can
              manage your cookie preferences through your browser settings. Essential
              cookies required for the functioning of our site cannot be disabled.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Data Security</h2>
            <p className={styles.sectionText}>
              We implement appropriate technical and organisational measures to
              protect your personal information against unauthorised access,
              alteration, disclosure, or destruction. All payment transactions are
              encrypted using industry-standard SSL technology.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Your Rights</h2>
            <p className={styles.sectionText}>
              You have the right to access, correct, or delete your personal
              information at any time. You may also opt out of marketing
              communications by clicking the unsubscribe link in any email or
              contacting us directly. To exercise any of these rights, please
              email us at privacy@faycollectibles.com.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Changes to This Policy</h2>
            <p className={styles.sectionText}>
              We may update this privacy policy from time to time. Any changes
              will be posted on this page with an updated revision date. We
              encourage you to review this policy periodically.
            </p>
          </div>

          <p className={styles.lastUpdated}>Last updated: February 2026</p>
        </div>
      </div>
    </div>
  );
}
