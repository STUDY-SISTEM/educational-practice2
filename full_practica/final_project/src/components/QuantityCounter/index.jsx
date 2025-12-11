import React from 'react';
import styles from './QuantityCounter.module.css';

/**
 * QuantityCounter displays a minus and plus button with the current value in
 * between. It calls the provided callbacks when the value should change.
 */
const QuantityCounter = ({ value, onDecrease, onIncrease, min = 1 }) => {
  return (
    <div className={styles.counter}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={value <= min}
        className={styles.btn}
      >
        –
      </button>
      <span className={styles.value}>{value}</span>
      <button type="button" onClick={onIncrease} className={styles.btn}>
        +
      </button>
    </div>
  );
};

export default QuantityCounter;