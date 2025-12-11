import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './DiscountForm.module.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

/**
 * DiscountForm handles the 5% discount form on the home page. Upon
 * submission it sends the form data to the backend and displays a
 * confirmation state.
 */
const DiscountForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/sale/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
      reset();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.fields}>
        <input
          type="text"
          placeholder="Name"
          {...register('name', { required: true })}
        />
        <input
          type="tel"
          placeholder="Phone number"
          {...register('phone', { required: true })}
        />
        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
        />
      </div>
      <button
        type="submit"
        className={`${styles.button} ${submitted ? styles.submitted : ''}`}
        disabled={loading || submitted}
      >
        {submitted ? 'Request Submitted' : 'Get a discount'}
      </button>
    </form>
  );
};

export default DiscountForm;