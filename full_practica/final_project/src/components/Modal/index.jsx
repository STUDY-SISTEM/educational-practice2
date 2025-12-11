import React from 'react';
import styles from './Modal.module.css';

/**
 * A simple modal overlay. Shows children in the center of a semi‑transparent
 * backdrop. When `open` is false, it renders nothing. Calls `onClose`
 * when the backdrop is clicked or when the user presses the close icon.
 */
const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="close">
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;