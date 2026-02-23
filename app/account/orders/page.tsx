import Link from 'next/link';
import { mockOrders } from '@/lib/user';
import styles from '../account.module.css';
import orderStyles from './orders.module.css';

export const metadata = {
  title: 'My Orders — FAY Collectibles',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function OrdersPage() {
  return (
    <div>
      <h1 className={styles.pageTitle}>My Orders</h1>
      <p className={styles.pageSubtitle}>
        Track and manage your orders.
      </p>

      {mockOrders.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="12" width="32" height="28" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 20h32" stroke="currentColor" strokeWidth="1.5" />
              <path d="M20 8v8M28 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <p className={styles.emptyTitle}>No orders yet</p>
          <p className={styles.emptyText}>
            When you place an order, it will appear here.
          </p>
          <Link href="/shop" className={`${styles.btn} ${styles.btnPrimary}`}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className={orderStyles.orderList}>
          {mockOrders.map((order) => (
            <div key={order.id} className={orderStyles.orderCard}>
              {/* Order header */}
              <div className={orderStyles.orderHeader}>
                <div className={orderStyles.orderHeaderLeft}>
                  <span className={orderStyles.orderNumber}>
                    {order.orderNumber}
                  </span>
                  <span className={orderStyles.orderDate}>
                    {formatDate(order.date)}
                  </span>
                </div>
                <span
                  className={`${styles.badge} ${
                    order.status === 'Delivered'
                      ? styles.badgeDelivered
                      : order.status === 'Shipped'
                        ? styles.badgeShipped
                        : order.status === 'Processing'
                          ? styles.badgeProcessing
                          : styles.badgeCancelled
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Order items */}
              <div className={orderStyles.orderItems}>
                {order.items.map((item, idx) => (
                  <div key={idx} className={orderStyles.orderItem}>
                    <div className={orderStyles.itemImage} />
                    <div className={orderStyles.itemDetails}>
                      <Link
                        href={`/product/${item.slug}`}
                        className={orderStyles.itemName}
                      >
                        {item.name}
                      </Link>
                      <p className={orderStyles.itemMeta}>
                        Size: {item.size} &middot; Qty: {item.quantity}
                      </p>
                      <p className={orderStyles.itemPrice}>
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order footer */}
              <div className={orderStyles.orderFooter}>
                <div className={orderStyles.orderTotal}>
                  <span className={orderStyles.totalLabel}>Total</span>
                  <span className={orderStyles.totalValue}>
                    ${order.total.toLocaleString()}
                  </span>
                </div>
                {order.trackingNumber && (
                  <p className={orderStyles.tracking}>
                    Tracking: {order.trackingNumber}
                  </p>
                )}
                {order.deliveryDate && (
                  <p className={orderStyles.deliveryDate}>
                    {order.status === 'Delivered'
                      ? `Delivered on ${formatDate(order.deliveryDate)}`
                      : `Estimated delivery: ${formatDate(order.deliveryDate)}`}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
