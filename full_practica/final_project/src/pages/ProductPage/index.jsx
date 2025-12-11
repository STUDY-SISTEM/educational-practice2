import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../store/slices/productsSlice';
import { addToCart } from '../../store/slices/cartSlice';
import QuantityCounter from '../../components/QuantityCounter';
import Contact from '../../components/Contact';
import styles from './ProductPage.module.css';

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, productStatus, productError } = useSelector(
    (state) => state.products
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);
  const handleAdd = () => {
    if (!currentProduct) return;
    const hasDiscount = currentProduct.discont_price != null;
    const price = hasDiscount ? currentProduct.discont_price : currentProduct.price;
    dispatch(
      addToCart({
        id: currentProduct.id,
        title: currentProduct.title,
        price,
        oldPrice: currentProduct.price,
        image: `${
          (process.env.REACT_APP_API_URL || 'http://localhost:3333') +
          currentProduct.image
        }`,
        quantity,
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : q));
  return (
    <div>
      <section className={`${styles.section} container`}>
        {productStatus === 'failed' ? (
          <h1>{productError}</h1>
        ) : !currentProduct ? (
          <h1>Loading…</h1>
        ) : (
          <div className={styles.productWrapper}>
            <div className={styles.imageBox}>
              <img
                src={`${
                  (process.env.REACT_APP_API_URL || 'http://localhost:3333') + currentProduct.image
                }`}
                alt={currentProduct.title}
              />
            </div>
            <div className={styles.infoBox}>
              <h2 className={styles.title}>{currentProduct.title}</h2>
              <div className={styles.prices}>
                <span className={styles.newPrice}>
                  ${currentProduct.discont_price ?? currentProduct.price}
                </span>
                {currentProduct.discont_price != null && (
                  <span className={styles.oldPrice}>${currentProduct.price}</span>
                )}
              </div>
              <QuantityCounter
                value={quantity}
                onDecrease={decrement}
                onIncrease={increment}
              />
              <button
                className={`${styles.addButton} ${added ? styles.added : ''}`}
                onClick={handleAdd}
              >
                {added ? 'Added' : 'Add to cart'}
              </button>
              <h3 className={styles.descTitle}>Description</h3>
              <p className={styles.description}>{currentProduct.description}</p>
            </div>
          </div>
        )}
      </section>
      <Contact />
    </div>
  );
};

export default ProductPage;