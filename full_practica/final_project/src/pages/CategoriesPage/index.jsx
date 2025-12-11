import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import CategoryCard from '../../components/CategoryCard';
import Contact from '../../components/Contact';
import styles from './CategoriesPage.module.css';

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { items: categories, status } = useSelector((state) => state.categories);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);
  return (
    <div>
      <section className={`${styles.section} container`}>
        <h1 className={styles.title}>Categories</h1>
        <div className={styles.grid}>
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>
      <Contact />
    </div>
  );
};

export default CategoriesPage;