import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';

// 👉 импортируем картинку логотипа
import logo from '../../assets/logo.png';

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={`${styles.inner} container`}>

        {/* 👉 новый логотип */}
        <div className={styles.logo}>
          <NavLink to="/">
            <img src={logo} alt="Logo" className={styles.logoImg} />
          </NavLink>
        </div>

        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)} end>
            Main Page
          </NavLink>

          <NavLink to="/categories" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
            Categories
          </NavLink>

          <NavLink to="/products" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
            All products
          </NavLink>

          <NavLink to="/sales" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
            All sales
          </NavLink>
        </nav>

        <div className={styles.cart}>
          <NavLink to="/cart" className={styles.cartLink}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2l1.5 5h13l-2 7h-12l-1.5-5h-3" />
              <circle cx="9" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
            </svg>

            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
