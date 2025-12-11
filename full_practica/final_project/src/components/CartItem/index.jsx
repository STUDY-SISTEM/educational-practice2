import React from 'react';
import { useDispatch } from 'react-redux';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from '../../store/slices/cartSlice';
import QuantityCounter from '../QuantityCounter';
import styles from './CartItem.module.css';

/**
 * Single cart item row. Displays image, title, quantity counter, price and
 * remove button. Price shown is per item * quantity.
 */
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { id, title, price, oldPrice, quantity, image } = item;
  const total = price * quantity;
  const oldTotal = oldPrice ? oldPrice * quantity : null;
  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <img src={image} alt={title} className={styles.img} />
        <div className={styles.name}>{title}</div>
      </div>
      <div className={styles.center}>
        <QuantityCounter
          value={quantity}
          onDecrease={() => dispatch(decreaseQuantity(id))}
          onIncrease={() => dispatch(increaseQuantity(id))}
        />
      </div>
      <div className={styles.price}>
        <span className={styles.total}>${total.toFixed(2)}</span>
        {oldTotal && <span className={styles.old}>${oldTotal.toFixed(2)}</span>}
      </div>
      <button
        className={styles.remove}
        onClick={() => dispatch(removeFromCart(id))}
        aria-label="remove item"
      >
        ×
      </button>
    </div>
  );
};

export default CartItem;