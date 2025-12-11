import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import { fetchAllProducts } from '../../store/slices/productsSlice';
import CategoryCard from '../../components/CategoryCard';
import ProductCard from '../../components/ProductCard';
import DiscountForm from '../../components/DiscountForm';
import Contact from '../../components/Contact';
import styles from './HomePage.module.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { items: categories, status: catStatus } = useSelector((state) => state.categories);
  const { items: products, status: prodStatus } = useSelector((state) => state.products);

  useEffect(() => {
    if (catStatus === 'idle') {
      dispatch(fetchCategories());
    }
    if (prodStatus === 'idle') {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, catStatus, prodStatus]);

  const saleProducts = products.filter((p) => p.discont_price != null).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={`${styles.heroContent} container`}>
          <h1>Amazing Discounts on Garden Products!</h1>
          <a href="#sale" className={styles.ctaButton}>Check out</a>
        </div>
      </section>

      {/* Categories Section */}
      <section className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <h2>Categories</h2>
          <a href="/categories" className={styles.linkBtn}>All categories</a>
        </div>
        <div className={styles.categoryGrid}>
          {categories.slice(0, 4).map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Discount Section */}
      <section className={styles.discountSection}>
        <div className={`${styles.discountContent} container`}>
          <div className={styles.discountText}>
            <h2>5% off on the first order</h2>
          </div>
          <DiscountForm />
        </div>
      </section>

      {/* Sale Section */}
      <section id="sale" className={`${styles.section} container`}>
        <div className={styles.sectionHeader}>
          <h2>Sale</h2>
          <a href="/sales" className={styles.linkBtn}>All sales</a>
        </div>
        <div className={styles.productGrid}>
          {saleProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default HomePage;