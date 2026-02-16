'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import styles from './Header.module.css';

const categories = [
  { label: 'All Products', href: '/shop' },
  { label: 'Tops', href: '/shop?category=tops' },
  { label: 'Bottoms', href: '/shop?category=bottoms' },
  { label: 'Outerwear', href: '/shop?category=outerwear' },
  { label: 'Accessories', href: '/shop?category=accessories' },
];

const collectionsLinks = [
  { label: 'The Essentials', href: '/shop?collection=the-essentials' },
  { label: 'New Season', href: '/shop?collection=new-season' },
  { label: 'The Edit', href: '/shop?collection=the-edit' },
  { label: 'View All Collections', href: '/collections' },
];

const highlights = [
  { label: 'New Arrivals', href: '/shop?filter=new' },
  { label: 'Lookbook', href: '/lookbook' },
];

const navLinks = [
  { label: 'Shop', href: '/shop', hasMegaMenu: true },
  { label: 'Collections', href: '/collections', hasMegaMenu: false },
  { label: 'Lookbook', href: '/lookbook', hasMegaMenu: false },
  { label: 'About', href: '/about', hasMegaMenu: false },
];

const mobileNavLinks = [
  { label: 'New Arrivals', href: '/shop?filter=new' },
  { label: 'Shop All', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'About', href: '/about' },
];

const mobileCategoryLinks = [
  { label: 'Tops', href: '/shop?category=tops' },
  { label: 'Bottoms', href: '/shop?category=bottoms' },
  { label: 'Outerwear', href: '/shop?category=outerwear' },
  { label: 'Accessories', href: '/shop?category=accessories' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount, openCart } = useCart();
  const megaMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMegaMenu = useCallback(() => {
    if (megaMenuTimeout.current) {
      clearTimeout(megaMenuTimeout.current);
      megaMenuTimeout.current = null;
    }
    setMegaMenuOpen(true);
  }, []);

  const closeMegaMenu = useCallback(() => {
    megaMenuTimeout.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 150);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => {
      const next = !prev;
      if (next) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return next;
    });
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, []);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
    >
      <div className={styles.inner}>
        {/* Left: Hamburger (mobile) / Nav (desktop) */}
        <div className={styles.left}>
          <button
            className={styles.hamburger}
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <nav className={styles.desktopNav} aria-label="Main navigation">
            {navLinks.map((link) =>
              link.hasMegaMenu ? (
                <div
                  key={link.href}
                  className={styles.navItemWithMenu}
                  onMouseEnter={openMegaMenu}
                  onMouseLeave={closeMegaMenu}
                >
                  <Link href={link.href} className={styles.navLink}>
                    {link.label}
                  </Link>
                </div>
              ) : (
                <Link key={link.href} href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>

        {/* Center: Logo */}
        <Link href="/" className={styles.logo} aria-label="FAY Collectibles home">
          <img
            src="/brand/logo-black.svg"
            alt="FAY"
            className={styles.logoImage}
          />
        </Link>

        {/* Right: Action icons */}
        <div className={styles.right}>
          {/* Search */}
          <Link href="#" className={styles.iconButton} aria-label="Search">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <line x1="13.5" y1="13.5" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Link>

          {/* Wishlist */}
          <Link
            href="/account/wishlist"
            className={styles.iconButton}
            aria-label="Wishlist"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M10 17.5s-7-4.5-7-9.5a4 4 0 0 1 7-2.65A4 4 0 0 1 17 8c0 5-7 9.5-7 9.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* Cart */}
          <button
            className={styles.iconButton}
            onClick={openCart}
            aria-label={`Shopping bag, ${itemCount} items`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 5h12l-1 10H5L4 5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 5V4a2.5 2.5 0 0 1 5 0v1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {itemCount > 0 && (
              <span className={styles.badge}>{itemCount}</span>
            )}
          </button>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <div
        className={`${styles.megaMenu} ${megaMenuOpen ? styles.megaMenuOpen : ''}`}
        onMouseEnter={openMegaMenu}
        onMouseLeave={closeMegaMenu}
        aria-hidden={!megaMenuOpen}
      >
        <div className={styles.megaMenuInner}>
          <div className={styles.megaMenuColumn}>
            <h3 className={styles.megaMenuTitle}>Categories</h3>
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className={styles.megaMenuLink}
                onClick={() => setMegaMenuOpen(false)}
              >
                {cat.label}
              </Link>
            ))}
          </div>
          <div className={styles.megaMenuColumn}>
            <h3 className={styles.megaMenuTitle}>Collections</h3>
            {collectionsLinks.map((col) => (
              <Link
                key={col.href}
                href={col.href}
                className={styles.megaMenuLink}
                onClick={() => setMegaMenuOpen(false)}
              >
                {col.label}
              </Link>
            ))}
          </div>
          <div className={styles.megaMenuColumn}>
            <h3 className={styles.megaMenuTitle}>Highlights</h3>
            {highlights.map((hl) => (
              <Link
                key={hl.href}
                href={hl.href}
                className={styles.megaMenuLink}
                onClick={() => setMegaMenuOpen(false)}
              >
                {hl.label}
              </Link>
            ))}
          </div>
          <div className={styles.megaMenuFeature}>
            <div className={styles.megaMenuFeatureImage} />
            <span className={styles.megaMenuFeatureLabel}>New Season</span>
            <span className={styles.megaMenuFeatureText}>Explore our latest collection</span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`${styles.overlay} ${mobileMenuOpen ? styles.overlayOpen : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className={styles.overlayInner}>
          <div className={styles.overlayHeader}>
            <button
              className={styles.closeButton}
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            {mobileNavLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.mobileNavLink}
                onClick={closeMobileMenu}
                style={{ animationDelay: `${(index + 1) * 80}ms` }}
              >
                {link.label}
              </Link>
            ))}

            <div className={styles.mobileNavDivider} />

            <span className={styles.mobileNavCategory}>Shop by Category</span>
            {mobileCategoryLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.mobileNavCategoryLink}
                onClick={closeMobileMenu}
                style={{ animationDelay: `${(mobileNavLinks.length + index + 2) * 80}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.overlayFooter}>
            <Link
              href="/account"
              className={styles.overlayFooterLink}
              onClick={closeMobileMenu}
            >
              Account
            </Link>
            <Link
              href="/account/wishlist"
              className={styles.overlayFooterLink}
              onClick={closeMobileMenu}
            >
              Wishlist
            </Link>
            <Link
              href="/help"
              className={styles.overlayFooterLink}
              onClick={closeMobileMenu}
            >
              Help
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
