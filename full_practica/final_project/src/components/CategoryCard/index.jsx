import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.css';

/**
 * Card showing a single category. Receives category object { id, title, image }
 * and builds a link to the category page.
 */
const CategoryCard = ({ category }) => {
  const { id, title, image } = category;
  // Build absolute image URL. The backend stores an absolute path beginning
  // with `/category_img/…` which can be appended to the API URL.
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3333';
  const imgSrc = `${apiUrl}${image}`;

  return (
    <Link to={`/categories/${id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={imgSrc} alt={title} />
      </div>
      <div className={styles.title}>{title}</div>
    </Link>
  );
};

export default CategoryCard;