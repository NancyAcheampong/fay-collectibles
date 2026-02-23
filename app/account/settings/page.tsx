'use client';

import { useState } from 'react';
import styles from '../account.module.css';
import settingsStyles from './settings.module.css';

export default function SettingsPage() {
  const [prefs, setPrefs] = useState({
    emailNewArrivals: true,
    emailPromotions: false,
    emailOrderUpdates: true,
    emailNewsletter: true,
  });

  function toggle(key: keyof typeof prefs) {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div>
      <h1 className={styles.pageTitle}>Settings</h1>
      <p className={styles.pageSubtitle}>
        Manage your communication preferences and account settings.
      </p>

      {/* Email preferences */}
      <section className={settingsStyles.section}>
        <h2 className={settingsStyles.sectionTitle}>Email Preferences</h2>
        <p className={settingsStyles.sectionDesc}>
          Choose which emails you would like to receive.
        </p>

        <div className={settingsStyles.toggleList}>
          <label className={settingsStyles.toggleRow}>
            <div className={settingsStyles.toggleInfo}>
              <span className={settingsStyles.toggleLabel}>New Arrivals</span>
              <span className={settingsStyles.toggleDesc}>
                Be the first to know about new collections and drops.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={prefs.emailNewArrivals}
              className={`${settingsStyles.toggle} ${
                prefs.emailNewArrivals ? settingsStyles.toggleOn : ''
              }`}
              onClick={() => toggle('emailNewArrivals')}
            >
              <span className={settingsStyles.toggleKnob} />
            </button>
          </label>

          <label className={settingsStyles.toggleRow}>
            <div className={settingsStyles.toggleInfo}>
              <span className={settingsStyles.toggleLabel}>Promotions</span>
              <span className={settingsStyles.toggleDesc}>
                Exclusive offers and seasonal promotions.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={prefs.emailPromotions}
              className={`${settingsStyles.toggle} ${
                prefs.emailPromotions ? settingsStyles.toggleOn : ''
              }`}
              onClick={() => toggle('emailPromotions')}
            >
              <span className={settingsStyles.toggleKnob} />
            </button>
          </label>

          <label className={settingsStyles.toggleRow}>
            <div className={settingsStyles.toggleInfo}>
              <span className={settingsStyles.toggleLabel}>Order Updates</span>
              <span className={settingsStyles.toggleDesc}>
                Shipping confirmations and delivery updates.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={prefs.emailOrderUpdates}
              className={`${settingsStyles.toggle} ${
                prefs.emailOrderUpdates ? settingsStyles.toggleOn : ''
              }`}
              onClick={() => toggle('emailOrderUpdates')}
            >
              <span className={settingsStyles.toggleKnob} />
            </button>
          </label>

          <label className={settingsStyles.toggleRow}>
            <div className={settingsStyles.toggleInfo}>
              <span className={settingsStyles.toggleLabel}>Newsletter</span>
              <span className={settingsStyles.toggleDesc}>
                Editorial content, styling tips, and brand stories.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={prefs.emailNewsletter}
              className={`${settingsStyles.toggle} ${
                prefs.emailNewsletter ? settingsStyles.toggleOn : ''
              }`}
              onClick={() => toggle('emailNewsletter')}
            >
              <span className={settingsStyles.toggleKnob} />
            </button>
          </label>
        </div>
      </section>

      {/* Password */}
      <section className={settingsStyles.section}>
        <h2 className={settingsStyles.sectionTitle}>Password</h2>
        <p className={settingsStyles.sectionDesc}>
          Update your password to keep your account secure.
        </p>

        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="currentPassword">
              Current Password
            </label>
            <input
              className={styles.formInput}
              id="currentPassword"
              type="password"
              placeholder="Enter current password"
            />
          </div>
          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="newPassword">
              New Password
            </label>
            <input
              className={styles.formInput}
              id="newPassword"
              type="password"
              placeholder="Enter new password"
            />
          </div>
        </div>
        <div className={styles.formActions}>
          <button className={`${styles.btn} ${styles.btnOutline} ${styles.btnSmall}`}>
            Update Password
          </button>
        </div>
      </section>

      {/* Danger zone */}
      <section className={settingsStyles.section}>
        <h2 className={settingsStyles.sectionTitle}>Account</h2>
        <p className={settingsStyles.sectionDesc}>
          Permanently delete your account and all associated data.
        </p>
        <button className={settingsStyles.deleteBtn}>
          Delete Account
        </button>
      </section>
    </div>
  );
}
