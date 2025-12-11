import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryById } from '../../store/slices/categoriesSlice';
import ProductCard from '../../components/ProductCard';
import PriceFilter from '../../components/PriceFilter';
import SortSelect from '../../components/SortSelect';
import Contact from '../../components/Contact';
import styles from './CategoryPage.module.css';

const CategoryPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    currentCategory,
    categoryProducts,
    categoryStatus,
    categoryError,
  } = useSelector((state) => state.categories);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [discountOnly, setDiscountOnly] = useState(false);
  const [sort, setSort] = useState('default');

  useEffect(() => {
    dispatch(fetchCategoryById(id));
  }, [dispatch, id]);

  const filtered = categoryProducts
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
        return b.id - a.id;
      }
      return 0;
    });

  return (
    <div>
      <section className={`${styles.section} container`}>
        {categoryStatus === 'failed' ? (
          <h1 className={styles.title}>{categoryError}</h1>
        ) : (
          <>
            <h1 className={styles.title}>{currentCategory ? currentCategory.title : 'Loading…'}</h1>
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
          </>
        )}
      </section>
      <Contact />
    </div>
  );
};

export default CategoryPage;