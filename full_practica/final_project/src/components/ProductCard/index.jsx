import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import styles from './ProductCard.module.css';

/**
 * Card representing a single product. Displays price and discount label
 * and allows adding the item to the cart. When `showButton` is true
 * the Add to cart button appears on hover or always visible on small screens.
 */
const ProductCard = ({ product, showButton = true }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const {
    id,
    title,
    price,
    discont_price: discountPrice,
    image,
  } = product;
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3333';
  const imgSrc = `${apiUrl}${image}`;
  const hasDiscount = discountPrice != null && discountPrice !== '';
  const discountPercentage = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : null;

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        id,
        title,
        price: hasDiscount ? discountPrice : price,
        oldPrice: price,
        image: imgSrc,
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link to={`/products/${id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={imgSrc} alt={title} />
        {hasDiscount && (
          <span className={styles.discountBadge}>-{discountPercentage}%</span>
        )}
        {showButton && (
          <button
            className={`${styles.addButton} ${added ? styles.added : ''}`}
            onClick={handleAdd}
          >
            {added ? 'Added' : 'Add to cart'}
          </button>
        )}
      </div>
      <div className={styles.cardBody}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.prices}>
          <span className={styles.newPrice}>${hasDiscount ? discountPrice : price}</span>
          {hasDiscount && <span className={styles.oldPrice}>${price}</span>}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;