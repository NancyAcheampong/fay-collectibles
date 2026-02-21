import type { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/lib/products';
import { ShopContent } from '@/components/shop';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Shop | FAY Collectibles',
  description:
    'Explore the full FAY Collectibles range. Curated essentials and new-season pieces in tops, bottoms, outerwear, and accessories.',
};

export default function ShopPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Shop</h1>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <ol className={styles.breadcrumbList}>
            <li className={styles.breadcrumbItem}>
              <Link href="/" className={styles.breadcrumbLink}>
                Home
              </Link>
            </li>
            <li className={styles.breadcrumbSeparator} aria-hidden="true">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 2.5L8 6L4.5 9.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </li>
            <li className={styles.breadcrumbItem}>
              <span className={styles.breadcrumbCurrent} aria-current="page">
                Shop
              </span>
            </li>
          </ol>
        </nav>
      </section>

      <section className={styles.content}>
        <ShopContent products={products} />
      </section>
    </div>
  );
}
