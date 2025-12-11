import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { clearCart } from '../../store/slices/cartSlice';
import CartItem from '../../components/CartItem';
import Contact from '../../components/Contact';
import Modal from '../../components/Modal';
import styles from './CartPage.module.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const { register, handleSubmit, reset } = useForm();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const onSubmit = async (data) => {
    try {
      await fetch(`${API_URL}/order/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, items: cartItems }),
      });
      setOrderPlaced(true);
      reset();
      dispatch(clearCart());
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <section className={`${styles.section} container`}>
        <h1 className={styles.title}>Shopping cart</h1>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Looks like you have no items in your basket currently.</p>
            <a href="/products" className={styles.continueBtn}>Continue Shopping</a>
          </div>
        ) : (
          <div className={styles.cartContent}>
            <div className={styles.itemsList}>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className={styles.summaryBox}>
              <h2>Order details</h2>
              <p className={styles.summaryRow}>
                <span>{totalCount} items</span>
              </p>
              <p className={styles.totalPrice}>Total <strong>${totalPrice.toFixed(2)}</strong></p>
              <form className={styles.orderForm} onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  placeholder="Name"
                  {...register('name', { required: true })}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  {...register('phone', { required: true })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  {...register('email', { required: true })}
                  required
                />
                <button type="submit" className={styles.orderBtn}>Order</button>
              </form>
            </div>
          </div>
        )}
      </section>
      <Contact />
      <Modal open={orderPlaced} onClose={() => setOrderPlaced(false)}>
        <h2>Congratulations!</h2>
        <p>Your order has been successfully placed on the website.</p>
        <p>A manager will contact you shortly to confirm your order.</p>
      </Modal>
    </div>
  );
};

export default CartPage;