'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useWishlist } from '@/lib/wishlist-context';
import { useCart } from '@/lib/cart-context';
import styles from '../account.module.css';

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem: addToCart } = useCart();
  const [toast, setToast] = useState('');

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }

  function handleAddToBag(item: typeof items[number]) {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      size: 'One Size',
      quantity: 1,
      image: item.image,
      slug: item.slug,
    });
    showToast(`${item.name} added to bag`);
  }

  function handleRemove(id: string) {
    removeItem(id);
    showToast('Removed from wishlist');
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Wishlist</h1>
        <p className={styles.subtitle}>
          Pieces you&apos;ve saved for later.
        </p>
      </div>

      <nav className={styles.nav}>
        <Link href="/account/orders" className={styles.navLink}>
          Orders
        </Link>
        <Link href="/account/details" className={styles.navLink}>
          Details
        </Link>
        <Link href="/account/address-book" className={styles.navLink}>
          Addresses
        </Link>
        <Link href="/account/wishlist" className={`${styles.navLink} ${styles.navLinkActive}`}>
          Wishlist
        </Link>
      </nav>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <svg className={styles.emptyIcon} viewBox="0 0 56 56" fill="none">
            <path
              d="M28 48s-18-12.6-18-24a10 10 0 0 1 18-6 10 10 0 0 1 18 6c0 11.4-18 24-18 24Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <h2 className={styles.emptyTitle}>Your wishlist is empty</h2>
          <p className={styles.emptyText}>
            Browse our collections and save the pieces that catch your eye.
          </p>
          <Link href="/shop" className={styles.emptyBtn}>
            Explore the Shop
          </Link>
        </div>
      ) : (
        <div className={styles.cardGrid}>
          {items.map((item) => (
            <div key={item.id} className={styles.card}>
              <Link href={`/product/${item.slug}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.cardImage}
                />
              </Link>
              <p className={styles.cardName}>{item.name}</p>
              <p className={styles.cardText}>
                &pound;{item.price.toLocaleString()}
              </p>
              <div className={styles.cardActions}>
                <button
                  className={styles.cardAction}
                  onClick={() => handleAddToBag(item)}
                >
                  Add to Bag
                </button>
                <button
                  className={styles.cardAction}
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={`${styles.toast} ${toast ? styles.toastVisible : ''}`}>
        {toast}
      </div>
    </div>
  );
}
