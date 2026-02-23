'use client';

import { useState } from 'react';
import { mockUser } from '@/lib/user';
import styles from '../account.module.css';

export default function DetailsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ ...mockUser });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsEditing(false);
  }

  return (
    <div>
      <h1 className={styles.pageTitle}>My Details</h1>
      <p className={styles.pageSubtitle}>
        View and update your personal information.
      </p>

      <form onSubmit={handleSave}>
        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="firstName">
              First Name
            </label>
            <input
              className={styles.formInput}
              id="firstName"
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="lastName">
              Last Name
            </label>
            <input
              className={styles.formInput}
              id="lastName"
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className={`${styles.formField} ${styles.formFieldFull}`}>
            <label className={styles.formLabel} htmlFor="email">
              Email Address
            </label>
            <input
              className={styles.formInput}
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="phone">
              Phone Number
            </label>
            <input
              className={styles.formInput}
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="dateOfBirth">
              Date of Birth
            </label>
            <input
              className={styles.formInput}
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={form.dateOfBirth}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="gender">
              Gender
            </label>
            <select
              className={styles.formSelect}
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div className={styles.formActions}>
          {isEditing ? (
            <>
              <button
                type="submit"
                className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSmall}`}
              >
                Save Changes
              </button>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnOutline} ${styles.btnSmall}`}
                onClick={() => {
                  setForm({ ...mockUser });
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              className={`${styles.btn} ${styles.btnOutline} ${styles.btnSmall}`}
              onClick={() => setIsEditing(true)}
            >
              Edit Details
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
