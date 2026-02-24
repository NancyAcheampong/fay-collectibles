'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import styles from './CartDrawer.module.css';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } =
    useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        aria-label="Shopping bag"
        aria-hidden={!isOpen}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Bag</h2>
          <button
            className={styles.closeButton}
            onClick={closeCart}
            aria-label="Close bag"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <line
                x1="5"
                y1="5"
                x2="19"
                y2="19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="19"
                y1="5"
                x2="5"
                y2="19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                  <path
                    d="M8 12h32l-3 28H11L8 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 12V9a7 7 0 0 1 14 0v3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className={styles.emptyMessage}>Your bag is empty</p>
              <Link
                href="/shop"
                className={styles.emptyLink}
                onClick={closeCart}
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className={styles.itemList}>
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className={styles.cartItem}
                >
                  <div className={styles.itemImage}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : null}
                  </div>

                  <div className={styles.itemDetails}>
                    <div className={styles.itemTop}>
                      <div className={styles.itemInfo}>
                        <span className={styles.itemName}>{item.name}</span>
                        <span className={styles.itemSize}>
                          Size: {item.size}
                        </span>
                      </div>
                      <button
                        className={styles.removeButton}
                        onClick={() => removeItem(item.id, item.size)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden="true"
                        >
                          <line
                            x1="1"
                            y1="1"
                            x2="13"
                            y2="13"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                          <line
                            x1="13"
                            y1="1"
                            x2="1"
                            y2="13"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className={styles.itemBottom}>
                      <div className={styles.quantitySelector}>
                        <button
                          className={styles.quantityButton}
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          aria-label="Decrease quantity"
                        >
                          <svg
                            viewBox="0 0 12 12"
                            fill="none"
                            aria-hidden="true"
                          >
                            <line
                              x1="2"
                              y1="6"
                              x2="10"
                              y2="6"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                        <span className={styles.quantityValue}>
                          {item.quantity}
                        </span>
                        <button
                          className={styles.quantityButton}
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          aria-label="Increase quantity"
                        >
                          <svg
                            viewBox="0 0 12 12"
                            fill="none"
                            aria-hidden="true"
                          >
                            <line
                              x1="6"
                              y1="2"
                              x2="6"
                              y2="10"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                            <line
                              x1="2"
                              y1="6"
                              x2="10"
                              y2="6"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                      <span className={styles.itemPrice}>
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotalRow}>
              <span className={styles.subtotalLabel}>Subtotal</span>
              <span className={styles.subtotalValue}>
                ${total.toLocaleString()}
              </span>
            </div>
            <button className={styles.checkoutButton}>Checkout</button>
            <Link href="/shop" className={styles.continueLink} onClick={closeCart}>
              Continue Shopping
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
