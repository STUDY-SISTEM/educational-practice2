import React, { useState } from 'react';
import styles from './PriceFilter.module.css';

/**
 * PriceFilter component with two controlled inputs (min and max).
 * When either input changes, it calls the provided callback with the
 * updated range. Parent components can use this to filter products.
 */
const PriceFilter = ({ onChange }) => {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  const handleMinChange = (e) => {
    const value = e.target.value;
    setMin(value);
    onChange({ min: value, max });
  };
  const handleMaxChange = (e) => {
    const value = e.target.value;
    setMax(value);
    onChange({ min, max: value });
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Price</span>
      <input
        type="number"
        placeholder="from"
        value={min}
        onChange={handleMinChange}
        className={styles.input}
      />
      <input
        type="number"
        placeholder="to"
        value={max}
        onChange={handleMaxChange}
        className={styles.input}
      />
    </div>
  );
};

export default PriceFilter;