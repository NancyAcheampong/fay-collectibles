'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import styles from './checkout.module.css';

type ShippingData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type PaymentData = {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvc: string;
};

const SHIPPING_COST = 0;
const STEPS = ['Shipping', 'Payment', 'Review'] as const;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart, itemCount } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [placing, setPlacing] = useState(false);

  const [shipping, setShipping] = useState<ShippingData>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Ghana',
  });

  const [payment, setPayment] = useState<PaymentData>({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: '',
  });

  const orderTotal = total + SHIPPING_COST;

  function updateShipping(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setShipping((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function updatePayment(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      const digits = value.replace(/\D/g, '').slice(0, 16);
      const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
      setPayment((prev) => ({ ...prev, cardNumber: formatted }));
      return;
    }

    if (name === 'expiry') {
      const digits = value.replace(/\D/g, '').slice(0, 4);
      const formatted = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
      setPayment((prev) => ({ ...prev, expiry: formatted }));
      return;
    }

    if (name === 'cvc') {
      setPayment((prev) => ({ ...prev, cvc: value.replace(/\D/g, '').slice(0, 4) }));
      return;
    }

    setPayment((prev) => ({ ...prev, [name]: value }));
  }

  function validateShipping(): boolean {
    const { firstName, lastName, email, address, city, state, postalCode } = shipping;
    if (!firstName || !lastName || !email || !address || !city || !state || !postalCode) {
      setError('Please fill in all required fields.');
      return false;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError('');
    return true;
  }

  function validatePayment(): boolean {
    const { cardNumber, cardName, expiry, cvc } = payment;
    if (!cardNumber || !cardName || !expiry || !cvc) {
      setError('Please fill in all payment fields.');
      return false;
    }
    if (cardNumber.replace(/\s/g, '').length < 16) {
      setError('Please enter a valid card number.');
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      setError('Please enter expiry as MM/YY.');
      return false;
    }
    if (cvc.length < 3) {
      setError('Please enter a valid CVC.');
      return false;
    }
    setError('');
    return true;
  }

  function handleNext() {
    if (step === 0 && !validateShipping()) return;
    if (step === 1 && !validatePayment()) return;
    setStep((s) => s + 1);
  }

  async function handlePlaceOrder() {
    setPlacing(true);
    // Simulate processing
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    router.push('/checkout/confirmation');
  }

  // Empty cart
  if (items.length === 0 && !placing) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M8 12h32l-3 28H11L8 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M17 12V9a7 7 0 0 1 14 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className={styles.emptyTitle}>Your bag is empty</p>
            <p className={styles.emptyText}>Add some items before checking out.</p>
            <Link href="/shop" className={styles.emptyLink}>Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link href="/shop" className={styles.breadcrumbLink}>Shop</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>Checkout</span>
        </nav>

        <h1 className={styles.title}>Checkout</h1>

        {/* Steps */}
        <div className={styles.steps}>
          {STEPS.map((label, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {i > 0 && <span className={styles.stepConnector} />}
              <span
                className={`${styles.step} ${
                  i === step ? styles.stepActive : i < step ? styles.stepCompleted : ''
                }`}
              >
                <span className={styles.stepNumber}>
                  {i < step ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.layout}>
          {/* Form area */}
          <div className={styles.formArea}>
            {error && <p className={styles.error}>{error}</p>}

            {/* Step 0: Shipping */}
            {step === 0 && (
              <div>
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Contact Information</h2>
                  <div className={styles.fieldGrid}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="firstName">First Name *</label>
                      <input className={styles.input} id="firstName" name="firstName" type="text" placeholder="First name" value={shipping.firstName} onChange={updateShipping} autoComplete="given-name" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="lastName">Last Name *</label>
                      <input className={styles.input} id="lastName" name="lastName" type="text" placeholder="Last name" value={shipping.lastName} onChange={updateShipping} autoComplete="family-name" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="email">Email *</label>
                      <input className={styles.input} id="email" name="email" type="email" placeholder="you@example.com" value={shipping.email} onChange={updateShipping} autoComplete="email" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="phone">Phone</label>
                      <input className={styles.input} id="phone" name="phone" type="tel" placeholder="+233 XX XXX XXXX" value={shipping.phone} onChange={updateShipping} autoComplete="tel" />
                    </div>
                  </div>
                </div>

                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Shipping Address</h2>
                  <div className={styles.fieldGrid}>
                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <label className={styles.label} htmlFor="address">Address *</label>
                      <input className={styles.input} id="address" name="address" type="text" placeholder="Street address" value={shipping.address} onChange={updateShipping} autoComplete="address-line1" />
                    </div>
                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <label className={styles.label} htmlFor="apartment">Apartment, suite, etc.</label>
                      <input className={styles.input} id="apartment" name="apartment" type="text" placeholder="Apt, suite, unit (optional)" value={shipping.apartment} onChange={updateShipping} autoComplete="address-line2" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="city">City *</label>
                      <input className={styles.input} id="city" name="city" type="text" placeholder="City" value={shipping.city} onChange={updateShipping} autoComplete="address-level2" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="state">Region / State *</label>
                      <input className={styles.input} id="state" name="state" type="text" placeholder="Region" value={shipping.state} onChange={updateShipping} autoComplete="address-level1" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="postalCode">Postal Code *</label>
                      <input className={styles.input} id="postalCode" name="postalCode" type="text" placeholder="Postal code" value={shipping.postalCode} onChange={updateShipping} autoComplete="postal-code" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="country">Country *</label>
                      <select className={styles.select} id="country" name="country" value={shipping.country} onChange={updateShipping} autoComplete="country-name">
                        <option value="Ghana">Ghana</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Kenya">Kenya</option>
                        <option value="South Africa">South Africa</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className={styles.nav}>
                  <Link href="/shop" className={styles.backBtn}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 3L4.5 7l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Back to Shop
                  </Link>
                  <button className={styles.nextBtn} onClick={handleNext}>
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <div>
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Payment Method</h2>
                  <div className={styles.fieldGrid}>
                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <label className={styles.label} htmlFor="cardNumber">Card Number *</label>
                      <input className={styles.input} id="cardNumber" name="cardNumber" type="text" placeholder="1234 5678 9012 3456" value={payment.cardNumber} onChange={updatePayment} inputMode="numeric" autoComplete="cc-number" />
                    </div>
                    <div className={`${styles.field} ${styles.fieldFull}`}>
                      <label className={styles.label} htmlFor="cardName">Name on Card *</label>
                      <input className={styles.input} id="cardName" name="cardName" type="text" placeholder="As shown on card" value={payment.cardName} onChange={updatePayment} autoComplete="cc-name" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="expiry">Expiry Date *</label>
                      <input className={styles.input} id="expiry" name="expiry" type="text" placeholder="MM/YY" value={payment.expiry} onChange={updatePayment} inputMode="numeric" autoComplete="cc-exp" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="cvc">CVC *</label>
                      <input className={styles.input} id="cvc" name="cvc" type="text" placeholder="123" value={payment.cvc} onChange={updatePayment} inputMode="numeric" autoComplete="cc-csc" />
                    </div>
                  </div>
                </div>

                <div className={styles.nav}>
                  <button className={styles.backBtn} onClick={() => { setError(''); setStep(0); }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 3L4.5 7l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Back to Shipping
                  </button>
                  <button className={styles.nextBtn} onClick={handleNext}>
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div>
                <div className={styles.reviewBlock}>
                  <div className={styles.reviewBlockHeader}>
                    <h3 className={styles.reviewBlockTitle}>Shipping</h3>
                    <button className={styles.reviewEdit} onClick={() => setStep(0)}>Edit</button>
                  </div>
                  <p className={styles.reviewName}>{shipping.firstName} {shipping.lastName}</p>
                  <p className={styles.reviewLine}>{shipping.address}{shipping.apartment ? `, ${shipping.apartment}` : ''}</p>
                  <p className={styles.reviewLine}>{shipping.city}, {shipping.state} {shipping.postalCode}</p>
                  <p className={styles.reviewLine}>{shipping.country}</p>
                  <p className={styles.reviewLine}>{shipping.email}</p>
                  {shipping.phone && <p className={styles.reviewLine}>{shipping.phone}</p>}
                </div>

                <div className={styles.reviewBlock}>
                  <div className={styles.reviewBlockHeader}>
                    <h3 className={styles.reviewBlockTitle}>Payment</h3>
                    <button className={styles.reviewEdit} onClick={() => setStep(1)}>Edit</button>
                  </div>
                  <p className={styles.reviewName}>{payment.cardName}</p>
                  <p className={styles.reviewLine}>
                    Card ending in {payment.cardNumber.replace(/\s/g, '').slice(-4)}
                  </p>
                  <p className={styles.reviewLine}>Expires {payment.expiry}</p>
                </div>

                <div className={styles.nav}>
                  <button className={styles.backBtn} onClick={() => setStep(1)}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 3L4.5 7l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Back to Payment
                  </button>
                  <button className={styles.nextBtn} onClick={handlePlaceOrder} disabled={placing}>
                    {placing ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>
              Order Summary ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </h2>
            <div className={styles.summaryItems}>
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className={styles.summaryItem}>
                  <div className={styles.summaryItemImage} />
                  <div className={styles.summaryItemDetails}>
                    <span className={styles.summaryItemName}>{item.name}</span>
                    <span className={styles.summaryItemMeta}>
                      Size: {item.size} &middot; Qty: {item.quantity}
                    </span>
                    <span className={styles.summaryItemPrice}>
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.summaryDivider} />
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Subtotal</span>
              <span className={styles.summaryValue}>${total.toLocaleString()}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Shipping</span>
              <span className={styles.summaryValue}>
                {SHIPPING_COST === 0 ? 'Complimentary' : `$${SHIPPING_COST}`}
              </span>
            </div>
            <div className={styles.summaryTotalRow}>
              <span className={styles.summaryTotalLabel}>Total</span>
              <span className={styles.summaryTotalValue}>${orderTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
