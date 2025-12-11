import React from 'react';
import styles from './SortSelect.module.css';

/**
 * SortSelect component provides a select input for sorting products. Options
 * correspond to the ones shown in the Figma. Pass an `onChange` handler
 * that receives the selected option value.
 */
const SortSelect = ({ value, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Sorted</span>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="default">by default</option>
        <option value="newest">newest</option>
        <option value="price-high-low">price: high‑low</option>
        <option value="price-low-high">price: low‑high</option>
      </select>
    </div>
  );
};

export default SortSelect;