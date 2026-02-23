import Link from 'next/link';
import { mockWishlist } from '@/lib/user';
import styles from '../account.module.css';
import wishlistStyles from './wishlist.module.css';

export const metadata = {
  title: 'Wishlist — FAY Collectibles',
};

export default function WishlistPage() {
  return (
    <div>
      <h1 className={styles.pageTitle}>Wishlist</h1>
      <p className={styles.pageSubtitle}>
        {mockWishlist.length}{' '}
        {mockWishlist.length === 1 ? 'item' : 'items'} saved
      </p>

      {mockWishlist.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path
                d="M24 42s-16-9.5-16-21a10 10 0 0 1 16-8 10 10 0 0 1 16 8c0 11.5-16 21-16 21z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>
          <p className={styles.emptyTitle}>Your wishlist is empty</p>
          <p className={styles.emptyText}>
            Save pieces you love and come back to them later.
          </p>
          <Link href="/shop" className={`${styles.btn} ${styles.btnPrimary}`}>
            Browse Collection
          </Link>
        </div>
      ) : (
        <div className={wishlistStyles.grid}>
          {mockWishlist.map((item) => (
            <div key={item.id} className={wishlistStyles.card}>
              <Link
                href={`/product/${item.slug}`}
                className={wishlistStyles.imageLink}
              >
                <div className={wishlistStyles.image} />
              </Link>
              <div className={wishlistStyles.info}>
                <span className={wishlistStyles.category}>{item.category}</span>
                <Link
                  href={`/product/${item.slug}`}
                  className={wishlistStyles.name}
                >
                  {item.name}
                </Link>
                <span className={wishlistStyles.price}>
                  ${item.price.toLocaleString()}
                </span>
                <div className={wishlistStyles.sizes}>
                  {item.sizes.map((size) => (
                    <span key={size} className={wishlistStyles.sizeChip}>
                      {size}
                    </span>
                  ))}
                </div>
                <div className={wishlistStyles.actions}>
                  <button
                    className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSmall} ${wishlistStyles.addBtn}`}
                  >
                    Add to Bag
                  </button>
                  <button className={wishlistStyles.removeBtn} aria-label="Remove from wishlist">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
