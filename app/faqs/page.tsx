import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'FAQs | FAY Collectibles',
  description:
    'Find answers to frequently asked questions about orders, shipping, returns, and more at FAY Collectibles.',
};

const faqs = [
  {
    category: 'Orders & Payment',
    questions: [
      {
        q: 'How do I place an order?',
        a: 'Browse our collections, select your size and quantity, and add items to your bag. When you\'re ready, proceed to checkout, enter your shipping details, and complete your payment.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards including Visa, Mastercard, and American Express. Additional payment options are displayed at checkout.',
      },
      {
        q: 'Can I modify or cancel my order after placing it?',
        a: 'We process orders quickly. If you need to make changes, please contact us at support@faycollectibles.com as soon as possible. We\'ll do our best to accommodate your request, but we cannot guarantee changes once an order has been dispatched.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'Orders are typically dispatched within 1\u20133 business days. Standard delivery takes 3\u20137 business days depending on your location. Express shipping options are available at checkout.',
      },
      {
        q: 'Do you offer international shipping?',
        a: 'Yes, we ship to select international destinations. Shipping costs and delivery times vary by location. Import duties and taxes may apply and are the responsibility of the customer.',
      },
      {
        q: 'How can I track my order?',
        a: 'Once your order has been dispatched, you\'ll receive an email with your tracking number and a link to track your shipment. You can also check your order status in your account dashboard.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We accept returns within 14 days of delivery. Items must be unworn, unwashed, and in their original condition with all tags attached. Please visit our Refund Policy page for full details.',
      },
      {
        q: 'How do I return an item?',
        a: 'Contact our customer care team at support@faycollectibles.com with your order number. We\'ll provide you with a return authorisation and shipping instructions.',
      },
      {
        q: 'How long does a refund take?',
        a: 'Once we receive and inspect your return, refunds are processed within 5\u201310 business days to your original payment method. Your bank may take additional time to reflect the refund.',
      },
    ],
  },
  {
    category: 'Product & Sizing',
    questions: [
      {
        q: 'How do I find my size?',
        a: 'Each product page includes a detailed size guide with measurements. If you\'re between sizes, we generally recommend sizing up for a more relaxed fit or down for a closer fit, depending on the garment style.',
      },
      {
        q: 'Are your product images accurate?',
        a: 'We make every effort to display colours and textures accurately. However, slight variations may occur depending on your screen settings. If you have questions about a specific product, please don\'t hesitate to contact us.',
      },
      {
        q: 'How should I care for my FAY garments?',
        a: 'Care instructions are included on each garment\'s label and product page. Generally, we recommend gentle washing at low temperatures and air drying to preserve the quality and longevity of our fabrics.',
      },
    ],
  },
  {
    category: 'Account & Support',
    questions: [
      {
        q: 'Do I need an account to place an order?',
        a: 'You can check out as a guest, but creating an account allows you to track orders, save addresses, and enjoy a faster checkout experience.',
      },
      {
        q: 'How do I contact customer support?',
        a: 'You can reach us at support@faycollectibles.com. We aim to respond to all enquiries within 24 hours during business days.',
      },
    ],
  },
];

export default function FAQsPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroLabel}>Support</span>
          <h1 className={styles.heroTitle}>Frequently Asked Questions</h1>
          <p className={styles.heroDesc}>
            Find answers to common questions about ordering, shipping, returns, and
            more. Can&apos;t find what you&apos;re looking for? Get in touch with
            our team.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <div className={styles.content}>
        <div className={styles.contentInner}>
          {faqs.map((group) => (
            <div key={group.category} className={styles.group}>
              <h2 className={styles.groupTitle}>{group.category}</h2>
              <div className={styles.questionList}>
                {group.questions.map((item) => (
                  <details key={item.q} className={styles.item}>
                    <summary className={styles.question}>{item.q}</summary>
                    <p className={styles.answer}>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Still Have Questions?</h2>
          <p className={styles.ctaDesc}>
            Our customer care team is here to help.
          </p>
          <Link href="mailto:support@faycollectibles.com" className={styles.ctaButton}>
            Contact Us
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
