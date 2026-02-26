'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../account.module.css';

/* ============================================
   Types
   ============================================ */

type Address = {
  id: string;
  label: string;
  name: string;
  line1: string;
  line2: string;
  city: string;
  postcode: string;
  country: string;
  isDefault: boolean;
};

/* ============================================
   Seed Data
   ============================================ */

const INITIAL_ADDRESSES: Address[] = [];

/* ============================================
   Component
   ============================================ */

export default function AddressBookPage() {
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [editing, setEditing] = useState<Address | null>(null);
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState('');

  /* ---------- Form state ---------- */
  const [formLabel, setFormLabel] = useState('');
  const [formName, setFormName] = useState('');
  const [formLine1, setFormLine1] = useState('');
  const [formLine2, setFormLine2] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formPostcode, setFormPostcode] = useState('');
  const [formCountry, setFormCountry] = useState('');
  const [formDefault, setFormDefault] = useState(false);

  function resetForm() {
    setFormLabel('');
    setFormName('');
    setFormLine1('');
    setFormLine2('');
    setFormCity('');
    setFormPostcode('');
    setFormCountry('');
    setFormDefault(false);
  }

  function openAdd() {
    resetForm();
    setEditing(null);
    setAdding(true);
  }

  function openEdit(addr: Address) {
    setFormLabel(addr.label);
    setFormName(addr.name);
    setFormLine1(addr.line1);
    setFormLine2(addr.line2);
    setFormCity(addr.city);
    setFormPostcode(addr.postcode);
    setFormCountry(addr.country);
    setFormDefault(addr.isDefault);
    setEditing(addr);
    setAdding(true);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();

    const entry: Address = {
      id: editing?.id ?? crypto.randomUUID(),
      label: formLabel || 'Home',
      name: formName,
      line1: formLine1,
      line2: formLine2,
      city: formCity,
      postcode: formPostcode,
      country: formCountry,
      isDefault: formDefault,
    };

    setAddresses((prev) => {
      let next = editing
        ? prev.map((a) => (a.id === editing.id ? entry : a))
        : [...prev, entry];

      if (entry.isDefault) {
        next = next.map((a) => ({
          ...a,
          isDefault: a.id === entry.id,
        }));
      }

      return next;
    });

    setAdding(false);
    setEditing(null);
    resetForm();
    showToast(editing ? 'Address updated' : 'Address added');
  }

  function handleDelete(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('Address removed');
  }

  /* ---------- Render ---------- */

  const showForm = adding;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Address Book</h1>
        <p className={styles.subtitle}>
          Manage your saved delivery addresses.
        </p>
      </div>

      <nav className={styles.nav}>
        <Link href="/account/orders" className={styles.navLink}>
          Orders
        </Link>
        <Link href="/account/details" className={styles.navLink}>
          Details
        </Link>
        <Link href="/account/address-book" className={`${styles.navLink} ${styles.navLinkActive}`}>
          Addresses
        </Link>
      </nav>

      {showForm ? (
        <form className={styles.form} onSubmit={handleSave} noValidate>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {editing ? 'Edit Address' : 'New Address'}
            </h2>
            <div className={styles.form}>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="addrLabel">Label</label>
                  <input
                    className={styles.input}
                    id="addrLabel"
                    type="text"
                    placeholder="e.g. Home, Office"
                    value={formLabel}
                    onChange={(e) => setFormLabel(e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="addrName">Full Name</label>
                  <input
                    className={styles.input}
                    id="addrName"
                    type="text"
                    placeholder="Full name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="addrLine1">Address Line 1</label>
                <input
                  className={styles.input}
                  id="addrLine1"
                  type="text"
                  placeholder="Street address"
                  value={formLine1}
                  onChange={(e) => setFormLine1(e.target.value)}
                  autoComplete="address-line1"
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="addrLine2">Address Line 2</label>
                <input
                  className={styles.input}
                  id="addrLine2"
                  type="text"
                  placeholder="Flat, suite, etc. (optional)"
                  value={formLine2}
                  onChange={(e) => setFormLine2(e.target.value)}
                  autoComplete="address-line2"
                />
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="addrCity">City</label>
                  <input
                    className={styles.input}
                    id="addrCity"
                    type="text"
                    placeholder="City"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    autoComplete="address-level2"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="addrPostcode">Postcode</label>
                  <input
                    className={styles.input}
                    id="addrPostcode"
                    type="text"
                    placeholder="Postcode"
                    value={formPostcode}
                    onChange={(e) => setFormPostcode(e.target.value)}
                    autoComplete="postal-code"
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="addrCountry">Country</label>
                <input
                  className={styles.input}
                  id="addrCountry"
                  type="text"
                  placeholder="Country"
                  value={formCountry}
                  onChange={(e) => setFormCountry(e.target.value)}
                  autoComplete="country-name"
                  required
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formDefault}
                  onChange={(e) => setFormDefault(e.target.checked)}
                />
                <span className={styles.label} style={{ textTransform: 'none', letterSpacing: 'normal', fontSize: 'var(--text-sm)' }}>
                  Set as default address
                </span>
              </label>
            </div>
          </div>

          <div className={styles.submitRow}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => { setAdding(false); setEditing(null); resetForm(); }}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              {editing ? 'Update Address' : 'Save Address'}
            </button>
          </div>
        </form>
      ) : addresses.length === 0 ? (
        <div className={styles.empty}>
          <svg className={styles.emptyIcon} viewBox="0 0 56 56" fill="none">
            <path d="M28 6c-8.8 0-16 7.2-16 16 0 12 16 28 16 28s16-16 16-28c0-8.8-7.2-16-16-16Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="28" cy="22" r="6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <h2 className={styles.emptyTitle}>No saved addresses</h2>
          <p className={styles.emptyText}>
            Add a delivery address to speed up your checkout experience.
          </p>
          <button className={styles.emptyBtn} onClick={openAdd}>
            Add Address
          </button>
        </div>
      ) : (
        <>
          <div className={styles.submitRow} style={{ marginBottom: 'var(--space-lg)' }}>
            <button className={styles.submitBtn} onClick={openAdd}>
              Add New Address
            </button>
          </div>

          <div className={styles.cardGrid}>
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`${styles.card} ${addr.isDefault ? styles.cardDefault : ''}`}
              >
                {addr.isDefault && (
                  <span className={styles.cardBadge}>Default</span>
                )}
                <p className={styles.cardName}>{addr.name}</p>
                <p className={styles.cardText}>
                  {addr.line1}
                  {addr.line2 ? `, ${addr.line2}` : ''}
                  <br />
                  {addr.city}, {addr.postcode}
                  <br />
                  {addr.country}
                </p>
                <div className={styles.cardActions}>
                  <button className={styles.cardAction} onClick={() => openEdit(addr)}>
                    Edit
                  </button>
                  <button className={styles.cardAction} onClick={() => handleDelete(addr.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className={`${styles.toast} ${toast ? styles.toastVisible : ''}`}>
        {toast}
      </div>
    </div>
  );
}
