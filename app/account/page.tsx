import Link from 'next/link';
import { mockUser, mockOrders, mockAddresses, mockWishlist } from '@/lib/user';
import styles from './account.module.css';
import overviewStyles from './overview.module.css';

export const metadata = {
  title: 'My Account — FAY Collectibles',
};

export default function AccountOverview() {
  const recentOrder = mockOrders[0];
  const defaultAddress = mockAddresses.find((a) => a.isDefault);

  return (
    <div>
      <h1 className={styles.pageTitle}>
        Welcome back, {mockUser.firstName}
      </h1>
      <p className={styles.pageSubtitle}>
        Manage your orders, details, and preferences.
      </p>

      <div className={overviewStyles.grid}>
        {/* Recent Order */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Recent Order</h2>
            <Link href="/account/orders" className={styles.cardAction}>
              View All
            </Link>
          </div>
          {recentOrder ? (
            <div className={overviewStyles.orderSummary}>
              <div className={overviewStyles.orderMeta}>
                <span className={overviewStyles.orderNumber}>
                  {recentOrder.orderNumber}
                </span>
                <span
                  className={`${styles.badge} ${
                    recentOrder.status === 'Delivered'
                      ? styles.badgeDelivered
                      : recentOrder.status === 'Shipped'
                        ? styles.badgeShipped
                        : recentOrder.status === 'Processing'
                          ? styles.badgeProcessing
                          : styles.badgeCancelled
                  }`}
                >
                  {recentOrder.status}
                </span>
              </div>
              <p className={overviewStyles.orderDate}>
                {new Date(recentOrder.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <p className={overviewStyles.orderItems}>
                {recentOrder.items.length}{' '}
                {recentOrder.items.length === 1 ? 'item' : 'items'} &middot;
                ${recentOrder.total.toLocaleString()}
              </p>
            </div>
          ) : (
            <p className={overviewStyles.emptyLine}>No orders yet.</p>
          )}
        </div>

        {/* My Details */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>My Details</h2>
            <Link href="/account/details" className={styles.cardAction}>
              Edit
            </Link>
          </div>
          <div className={overviewStyles.detailLines}>
            <p className={overviewStyles.detailName}>
              {mockUser.firstName} {mockUser.lastName}
            </p>
            <p className={overviewStyles.detailText}>{mockUser.email}</p>
            <p className={overviewStyles.detailText}>{mockUser.phone}</p>
          </div>
        </div>

        {/* Default Address */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Default Address</h2>
            <Link href="/account/addresses" className={styles.cardAction}>
              Manage
            </Link>
          </div>
          {defaultAddress ? (
            <div className={overviewStyles.detailLines}>
              <p className={overviewStyles.detailName}>
                {defaultAddress.firstName} {defaultAddress.lastName}
              </p>
              <p className={overviewStyles.detailText}>
                {defaultAddress.addressLine1}
              </p>
              {defaultAddress.addressLine2 && (
                <p className={overviewStyles.detailText}>
                  {defaultAddress.addressLine2}
                </p>
              )}
              <p className={overviewStyles.detailText}>
                {defaultAddress.city}, {defaultAddress.state}{' '}
                {defaultAddress.postalCode}
              </p>
              <p className={overviewStyles.detailText}>
                {defaultAddress.country}
              </p>
            </div>
          ) : (
            <p className={overviewStyles.emptyLine}>No address saved.</p>
          )}
        </div>

        {/* Wishlist */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Wishlist</h2>
            <Link href="/account/wishlist" className={styles.cardAction}>
              View All
            </Link>
          </div>
          <p className={overviewStyles.detailText}>
            {mockWishlist.length}{' '}
            {mockWishlist.length === 1 ? 'item' : 'items'} saved
          </p>
          {mockWishlist.length > 0 && (
            <div className={overviewStyles.wishlistPreview}>
              {mockWishlist.slice(0, 3).map((item) => (
                <div key={item.id} className={overviewStyles.wishlistThumb}>
                  <div className={overviewStyles.wishlistThumbImage} />
                  <span className={overviewStyles.wishlistThumbName}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
