import { mockAddresses } from '@/lib/user';
import styles from '../account.module.css';
import addressStyles from './addresses.module.css';

export const metadata = {
  title: 'Address Book — FAY Collectibles',
};

export default function AddressesPage() {
  return (
    <div>
      <div className={addressStyles.header}>
        <div>
          <h1 className={styles.pageTitle}>Address Book</h1>
          <p className={styles.pageSubtitle}>
            Manage your shipping and billing addresses.
          </p>
        </div>
        <button className={`${styles.btn} ${styles.btnOutline} ${styles.btnSmall}`}>
          Add New Address
        </button>
      </div>

      {mockAddresses.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 4C16.27 4 10 10.27 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="24" cy="18" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <p className={styles.emptyTitle}>No addresses saved</p>
          <p className={styles.emptyText}>
            Add an address to make checkout faster.
          </p>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>
            Add Address
          </button>
        </div>
      ) : (
        <div className={addressStyles.grid}>
          {mockAddresses.map((address) => (
            <div key={address.id} className={addressStyles.addressCard}>
              <div className={addressStyles.addressTop}>
                <div className={addressStyles.addressLabel}>
                  {address.label}
                  {address.isDefault && (
                    <span className={addressStyles.defaultBadge}>Default</span>
                  )}
                </div>
                <div className={addressStyles.addressActions}>
                  <button className={styles.cardAction}>Edit</button>
                  {!address.isDefault && (
                    <button className={styles.cardAction}>Remove</button>
                  )}
                </div>
              </div>
              <div className={addressStyles.addressBody}>
                <p className={addressStyles.addressName}>
                  {address.firstName} {address.lastName}
                </p>
                <p className={addressStyles.addressLine}>
                  {address.addressLine1}
                </p>
                {address.addressLine2 && (
                  <p className={addressStyles.addressLine}>
                    {address.addressLine2}
                  </p>
                )}
                <p className={addressStyles.addressLine}>
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p className={addressStyles.addressLine}>{address.country}</p>
                <p className={addressStyles.addressPhone}>{address.phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
