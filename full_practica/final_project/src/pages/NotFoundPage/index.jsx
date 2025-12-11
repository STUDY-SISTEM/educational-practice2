import React from 'react';
import Contact from '../../components/Contact';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div>
      <section className={`${styles.section} container`}>
        <div className={styles.notFound}>
          <div className={styles.code}>
            <span>4</span>
            <span role="img" aria-label="cactus" className={styles.cactus}>🌵</span>
            <span>4</span>
          </div>
          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.desc}>
            We're sorry, the page you requested could not be found. Please go
            back to the homepage.
          </p>
          <a href="/" className={styles.homeBtn}>Go Home</a>
        </div>
      </section>
      <Contact />
    </div>
  );
};

export default NotFoundPage;