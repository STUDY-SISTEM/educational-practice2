import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../store/slices/productsSlice';
import ProductCard from '../../components/ProductCard';
import PriceFilter from '../../components/PriceFilter';
import SortSelect from '../../components/SortSelect';
import Contact from '../../components/Contact';
import styles from './AllProductsPage.module.css';

const AllProductsPage = () => {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [discountOnly, setDiscountOnly] = useState(false);
  const [sort, setSort] = useState('default');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, status]);

  // Filter and sort products based on UI controls
  const filtered = products
    .filter((p) => {
      const price = p.discont_price ?? p.price;
      if (priceRange.min && price < Number(priceRange.min)) return false;
      if (priceRange.max && price > Number(priceRange.max)) return false;
      if (discountOnly && p.discont_price == null) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'price-low-high') {
        const pa = a.discont_price ?? a.price;
        const pb = b.discont_price ?? b.price;
        return pa - pb;
      }
      if (sort === 'price-high-low') {
        const pa = a.discont_price ?? a.price;
        const pb = b.discont_price ?? b.price;
        return pb - pa;
      }
      if (sort === 'newest') {
        // no date available in dataset; fallback to id desc
        return b.id - a.id;
      }
      return 0;
    });

  return (
    <div>
      <section className={`${styles.section} container`}>
        <h1 className={styles.title}>All products</h1>
        <div className={styles.filters}>
          <PriceFilter onChange={setPriceRange} />
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={discountOnly}
              onChange={(e) => setDiscountOnly(e.target.checked)}
            />
            <span>Discounted items</span>
          </label>
          <SortSelect value={sort} onChange={setSort} />
        </div>
        <div className={styles.productGrid}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <Contact />
    </div>
  );
};

export default AllProductsPage;