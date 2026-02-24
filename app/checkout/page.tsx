'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import styles from './checkout.module.css';

/* ============================================
   Types
   ============================================ */

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

/* ============================================
   Constants
   ============================================ */

const STEPS = ['Bag', 'Shipping', 'Payment', 'Review'] as const;
type Step = (typeof STEPS)[number];

const DELIVERY_OPTIONS = [
  { id: 'standard', label: 'Standard Delivery', time: '5–7 business days', cost: 0 },
  { id: 'express', label: 'Express Delivery', time: '2–3 business days', cost: 25 },
];

/* ============================================
   Back arrow SVG (reused)
   ============================================ */

function BackArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M8.5 3L4.5 7l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ============================================
   Component
   ============================================ */

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, itemCount, clearCart, removeItem, updateQuantity } = useCart();
  const { user, isAuthenticated } = useAuth();

  // If signed in, skip the email gate inside bag step
  const [step, setStep] = useState<Step>('Bag');
  const [guestEmail, setGuestEmail] = useState('');
  const [showGate, setShowGate] = useState(false);
  const [error, setError] = useState('');
  const [placing, setPlacing] = useState(false);
  const [delivery, setDelivery] = useState('standard');

  const shippingCost = DELIVERY_OPTIONS.find((d) => d.id === delivery)?.cost ?? 0;
  const orderTotal = total + shippingCost;
  const contactEmail = isAuthenticated ? user?.email ?? '' : guestEmail;

  const [shipping, setShipping] = useState<ShippingData>({
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
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

  /* ---- helpers ---- */

  function updateShipping(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setShipping((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function updatePayment(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      const d = value.replace(/\D/g, '').slice(0, 16);
      setPayment((p) => ({ ...p, cardNumber: d.replace(/(\d{4})(?=\d)/g, '$1 ') }));
      return;
    }
    if (name === 'expiry') {
      const d = value.replace(/\D/g, '').slice(0, 4);
      setPayment((p) => ({ ...p, expiry: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d }));
      return;
    }
    if (name === 'cvc') {
      setPayment((p) => ({ ...p, cvc: value.replace(/\D/g, '').slice(0, 4) }));
      return;
    }
    setPayment((p) => ({ ...p, [name]: value }));
  }

  function proceedFromBag() {
    if (isAuthenticated) {
      setStep('Shipping');
    } else {
      setShowGate(true);
    }
  }

  function proceedAsGuest() {
    setError('');
    if (!guestEmail.trim() || !guestEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setShipping((prev) => ({ ...prev, email: guestEmail.trim() }));
    setShowGate(false);
    setStep('Shipping');
  }

  function validateShipping(): boolean {
    const { firstName, lastName, email, address, city, state, postalCode } = shipping;
    if (!firstName || !lastName || !email || !address || !city || !state || !postalCode) {
      setError('Please fill in all required fields.');
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

  async function handlePlaceOrder() {
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    router.push('/checkout/confirmation');
  }

  const stepIndex = STEPS.indexOf(step);

  /* ============================================
     Empty bag
     ============================================ */

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
            <p className={styles.emptyText}>Add items to your bag to start checkout.</p>
            <Link href="/shop" className={styles.emptyLink}>Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================
     Render
     ============================================ */

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

        <h1 className={styles.pageTitle}>Checkout</h1>

        {/* Progress bar */}
        <div className={styles.progress}>
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={`${styles.progressStep} ${
                i === stepIndex
                  ? styles.progressStepActive
                  : i < stepIndex
                    ? styles.progressStepDone
                    : ''
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        {/* ============================
            Email / Auth Gate (overlay)
            ============================ */}
        {showGate && (
          <div className={styles.gate}>
            <h2 className={styles.gateTitle}>How would you like to check out?</h2>
            <p className={styles.gateSubtitle}>
              Enter your email to continue as a guest, or sign in to your account.
            </p>

            <div className={styles.gateForm}>
              {error && <p className={styles.error}>{error}</p>}

              <div className={styles.field}>
                <label className={styles.label} htmlFor="guestEmail">Email Address</label>
                <input
                  className={styles.input}
                  id="guestEmail"
                  type="email"
                  placeholder="you@example.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <button className={styles.nextBtn} onClick={proceedAsGuest} style={{ width: '100%' }}>
                Continue as Guest
              </button>

              <div className={styles.gateDivider}>
                <span>or</span>
              </div>

              <Link href="/signin" className={styles.gateSignInLink}>
                Sign In to Your Account
              </Link>

              <button
                className={styles.backBtn}
                onClick={() => { setShowGate(false); setError(''); }}
                style={{ alignSelf: 'center', marginTop: '8px' }}
              >
                <BackArrow /> Back to Bag
              </button>
            </div>
          </div>
        )}

        {/* ============================
            Step: Bag
            ============================ */}
        {step === 'Bag' && !showGate && (
          <div className={styles.layout}>
            <div className={styles.main}>
              <div className={styles.bagItems}>
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className={styles.bagItem}>
                    <div className={styles.bagItemImage} />
                    <div className={styles.bagItemBody}>
                      <Link href={`/product/${item.slug}`} className={styles.bagItemName}>
                        {item.name}
                      </Link>
                      <span className={styles.bagItemMeta}>Size: {item.size}</span>
                      <div className={styles.bagItemBottom}>
                        <div className={styles.bagItemQty}>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                          </button>
                          <span className={styles.qtyVal}>{item.quantity}</span>
                          <button
                            className={styles.qtyBtn}
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <line x1="6" y1="2" x2="6" y2="10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                              <line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                            </svg>
                          </button>
                        </div>
                        <span className={styles.bagItemPrice}>
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                      <button
                        className={styles.bagItemRemove}
                        onClick={() => removeItem(item.id, item.size)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.nav}>
                <Link href="/shop" className={styles.backBtn}>
                  <BackArrow /> Continue Shopping
                </Link>
                <button className={styles.nextBtn} onClick={proceedFromBag}>
                  Go to Checkout
                </button>
              </div>
            </div>

            {/* Summary */}
            <OrderSummary items={items} total={total} shippingCost={0} orderTotal={total} itemCount={itemCount} />
          </div>
        )}

        {/* ============================
            Step: Shipping
            ============================ */}
        {step === 'Shipping' && (
          <div className={styles.layout}>
            <div className={styles.main}>
              {error && <p className={styles.error}>{error}</p>}

              {contactEmail && (
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-secondary)', marginBottom: 'var(--space-xl)' }}>
                  Checking out as <strong style={{ color: 'var(--color-primary)' }}>{contactEmail}</strong>
                </p>
              )}

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Shipping Address</h2>
                <div className={styles.fieldGrid}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="firstName">First Name *</label>
                    <input className={styles.input} id="firstName" name="firstName" value={shipping.firstName} onChange={updateShipping} placeholder="First name" autoComplete="given-name" />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="lastName">Last Name *</label>
                    <input className={styles.input} id="lastName" name="lastName" value={shipping.lastName} onChange={updateShipping} placeholder="Last name" autoComplete="family-name" />
                  </div>
                  <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label className={styles.label} htmlFor="address">Address *</label>
                    <input className={styles.input} id="address" name="address" value={shipping.address} onChange={updateShipping} placeholder="Street address" autoComplete="address-line1" />
                  </div>
                  <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label className={styles.label} htmlFor="apartment">Apartment, suite, etc.</label>
                    <input className={styles.input} id="apartment" name="apartment" value={shipping.apartment} onChange={updateShipping} placeholder="Optional" autoComplete="address-line2" />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="city">City *</label>
                    <input className={styles.input} id="city" name="city" value={shipping.city} onChange={updateShipping} placeholder="City" autoComplete="address-level2" />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="state">Region *</label>
                    <input className={styles.input} id="state" name="state" value={shipping.state} onChange={updateShipping} placeholder="Region" autoComplete="address-level1" />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="postalCode">Postal Code *</label>
                    <input className={styles.input} id="postalCode" name="postalCode" value={shipping.postalCode} onChange={updateShipping} placeholder="Postal code" autoComplete="postal-code" />
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
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="phone">Phone</label>
                    <input className={styles.input} id="phone" name="phone" type="tel" value={shipping.phone} onChange={updateShipping} placeholder="+233 XX XXX XXXX" autoComplete="tel" />
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Delivery Method</h2>
                <div className={styles.deliveryOptions}>
                  {DELIVERY_OPTIONS.map((opt) => (
                    <div
                      key={opt.id}
                      className={`${styles.deliveryOption} ${delivery === opt.id ? styles.deliveryOptionSelected : ''}`}
                      onClick={() => setDelivery(opt.id)}
                    >
                      <div className={styles.deliveryRadio} />
                      <div className={styles.deliveryInfo}>
                        <div>
                          <div className={styles.deliveryLabel}>{opt.label}</div>
                          <div className={styles.deliveryTime}>{opt.time}</div>
                        </div>
                        <span className={styles.deliveryCost}>
                          {opt.cost === 0 ? 'Free' : `$${opt.cost}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.nav}>
                <button className={styles.backBtn} onClick={() => { setError(''); setStep('Bag'); }}>
                  <BackArrow /> Back to Bag
                </button>
                <button className={styles.nextBtn} onClick={() => { if (validateShipping()) { setStep('Payment'); } }}>
                  Continue to Payment
                </button>
              </div>
            </div>

            <OrderSummary items={items} total={total} shippingCost={shippingCost} orderTotal={orderTotal} itemCount={itemCount} />
          </div>
        )}

        {/* ============================
            Step: Payment
            ============================ */}
        {step === 'Payment' && (
          <div className={styles.layout}>
            <div className={styles.main}>
              {error && <p className={styles.error}>{error}</p>}

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Payment Details</h2>
                <div className={styles.fieldGrid}>
                  <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label className={styles.label} htmlFor="cardNumber">Card Number *</label>
                    <input className={styles.input} id="cardNumber" name="cardNumber" value={payment.cardNumber} onChange={updatePayment} placeholder="1234 5678 9012 3456" inputMode="numeric" autoComplete="cc-number" />
                  </div>
                  <div className={`${styles.field} ${styles.fieldFull}`}>
                    <label className={styles.label} htmlFor="cardName">Name on Card *</label>
                    <input className={styles.input} id="cardName" name="cardName" value={payment.cardName} onChange={updatePayment} placeholder="As shown on card" autoComplete="cc-name" />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="expiry">Expiry *</label>
                    <input className={styles.input} id="expiry" name="expiry" value={payment.expiry} onChange={updatePayment} placeholder="MM/YY" inputMode="numeric" autoComplete="cc-exp" />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="cvc">CVC *</label>
                    <input className={styles.input} id="cvc" name="cvc" value={payment.cvc} onChange={updatePayment} placeholder="123" inputMode="numeric" autoComplete="cc-csc" />
                  </div>
                </div>

                <div className={styles.promoRow}>
                  <input className={styles.promoInput} type="text" placeholder="Promo code" />
                  <button className={styles.promoBtn}>Apply</button>
                </div>
              </div>

              <div className={styles.nav}>
                <button className={styles.backBtn} onClick={() => { setError(''); setStep('Shipping'); }}>
                  <BackArrow /> Back to Shipping
                </button>
                <button className={styles.nextBtn} onClick={() => { if (validatePayment()) { setStep('Review'); } }}>
                  Review Order
                </button>
              </div>
            </div>

            <OrderSummary items={items} total={total} shippingCost={shippingCost} orderTotal={orderTotal} itemCount={itemCount} />
          </div>
        )}

        {/* ============================
            Step: Review
            ============================ */}
        {step === 'Review' && (
          <div className={styles.layout}>
            <div className={styles.main}>
              <div className={styles.reviewBlock}>
                <div className={styles.reviewHeader}>
                  <h3 className={styles.reviewTitle}>Contact</h3>
                  <button className={styles.reviewEdit} onClick={() => setStep('Bag')}>Edit</button>
                </div>
                <p className={styles.reviewLine}>{contactEmail}</p>
              </div>

              <div className={styles.reviewBlock}>
                <div className={styles.reviewHeader}>
                  <h3 className={styles.reviewTitle}>Shipping Address</h3>
                  <button className={styles.reviewEdit} onClick={() => setStep('Shipping')}>Edit</button>
                </div>
                <p className={styles.reviewName}>{shipping.firstName} {shipping.lastName}</p>
                <p className={styles.reviewLine}>{shipping.address}{shipping.apartment ? `, ${shipping.apartment}` : ''}</p>
                <p className={styles.reviewLine}>{shipping.city}, {shipping.state} {shipping.postalCode}</p>
                <p className={styles.reviewLine}>{shipping.country}</p>
                {shipping.phone && <p className={styles.reviewLine}>{shipping.phone}</p>}
              </div>

              <div className={styles.reviewBlock}>
                <div className={styles.reviewHeader}>
                  <h3 className={styles.reviewTitle}>Delivery</h3>
                  <button className={styles.reviewEdit} onClick={() => setStep('Shipping')}>Edit</button>
                </div>
                <p className={styles.reviewName}>
                  {DELIVERY_OPTIONS.find((d) => d.id === delivery)?.label}
                </p>
                <p className={styles.reviewLine}>
                  {DELIVERY_OPTIONS.find((d) => d.id === delivery)?.time}
                  {' — '}
                  {shippingCost === 0 ? 'Free' : `$${shippingCost}`}
                </p>
              </div>

              <div className={styles.reviewBlock}>
                <div className={styles.reviewHeader}>
                  <h3 className={styles.reviewTitle}>Payment</h3>
                  <button className={styles.reviewEdit} onClick={() => setStep('Payment')}>Edit</button>
                </div>
                <p className={styles.reviewName}>{payment.cardName}</p>
                <p className={styles.reviewLine}>Card ending in {payment.cardNumber.replace(/\s/g, '').slice(-4)}</p>
                <p className={styles.reviewLine}>Expires {payment.expiry}</p>
              </div>

              <div className={styles.nav}>
                <button className={styles.backBtn} onClick={() => setStep('Payment')}>
                  <BackArrow /> Back to Payment
                </button>
                <button className={styles.nextBtn} onClick={handlePlaceOrder} disabled={placing}>
                  {placing ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>

            <OrderSummary items={items} total={total} shippingCost={shippingCost} orderTotal={orderTotal} itemCount={itemCount} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================
   Order Summary component
   ============================================ */

function OrderSummary({
  items,
  total,
  shippingCost,
  orderTotal,
  itemCount,
}: {
  items: { id: string; size: string; name: string; price: number; quantity: number }[];
  total: number;
  shippingCost: number;
  orderTotal: number;
  itemCount: number;
}) {
  return (
    <div className={styles.summary}>
      <h2 className={styles.summaryTitle}>
        Order Summary ({itemCount} {itemCount === 1 ? 'item' : 'items'})
      </h2>
      <div className={styles.summaryItems}>
        {items.map((item) => (
          <div key={`${item.id}-${item.size}`} className={styles.summaryItem}>
            <div className={styles.summaryItemThumb} />
            <div className={styles.summaryItemInfo}>
              <span className={styles.summaryItemName}>{item.name}</span>
              <span className={styles.summaryItemMeta}>Size: {item.size} · Qty: {item.quantity}</span>
              <span className={styles.summaryItemPrice}>${(item.price * item.quantity).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>Subtotal</span>
        <span className={styles.summaryValue}>${total.toLocaleString()}</span>
      </div>
      <div className={styles.summaryRow}>
        <span className={styles.summaryLabel}>Shipping</span>
        <span className={`${styles.summaryValue} ${shippingCost === 0 ? styles.summaryFree : ''}`}>
          {shippingCost === 0 ? 'Free' : `$${shippingCost}`}
        </span>
      </div>
      <div className={styles.summaryTotalRow}>
        <span className={styles.summaryTotalLabel}>Total</span>
        <span className={styles.summaryTotalValue}>${orderTotal.toLocaleString()}</span>
      </div>
    </div>
  );
}
