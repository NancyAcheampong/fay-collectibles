'use client';

import styles from './NewsletterForm.module.css';

export function NewsletterForm() {
  return (
    <form
      className={styles.form}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Email address"
        className={styles.input}
        aria-label="Email address"
        required
      />
      <button type="submit" className={styles.button}>
        Subscribe
      </button>
    </form>
  );
}
