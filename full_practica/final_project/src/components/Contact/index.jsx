import React from 'react';
import styles from './Contact.module.css';

/**
 * Contact information for the bottom of each page. The address and phone
 * values are fixed for this project, matching the provided mock‑ups.
 */
const Contact = () => {
  return (
    <section className={styles.contactSection}>
      <div className="container">
        <h2 className={styles.title}>Contact</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoBox}>
            <h3>Phone</h3>
            <p>+7 (499) 350‑66‑04</p>
          </div>
          <div className={styles.infoBox}>
            <h3>Address</h3>
            <p>Dubininskaya Ulitsa, 96, Moscow, Russia, 115093</p>
          </div>
          <div className={styles.infoBox}>
            <h3>Working Hours</h3>
            <p>24 hours a day</p>
          </div>
          <div className={styles.infoBox}>
            <h3>Socials</h3>
            <div className={styles.socials}>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                {/* Instagram icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37a4 4 0 1 1-4.63-4.63 4 4 0 0 1 4.63 4.63z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                {/* WhatsApp icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.52 3.48A11.88 11.88 0 0 0 12 0 12 12 0 0 0 0 12a11.88 11.88 0 0 0 3.48 8.52L0 24l3.48-3.48A11.88 11.88 0 0 0 12 24 12 12 0 0 0 24 12c0-3.19-1.25-6.19-3.48-8.52z" />
                  <path d="M17.28 14.73c-.29 0-.29 0-.53-.09s-1.62-.8-1.87-.89-.43-.13-.61.13-.69.89-.85 1.07-.31.2-.58.06a7.71 7.71 0 0 1-3.56-3.14 4 4 0 0 1-.81-2.26c0-.25.19-.38.41-.5s.45-.3.61-.5a.53.53 0 0 0 .09-.57 6.5 6.5 0 0 0-.58-1.32c-.16-.34-.32-.71-.53-.71s-.31-.01-.47-.01-.43.06-.64.25a2.59 2.59 0 0 0-.85 2 4.5 4.5 0 0 0 1 2.48 9.29 9.29 0 0 0 3.93 3.52 10.22 10.22 0 0 0 1.06.39c.41.13.75.13 1 .06s.62-.25.86-.5.5-.62.69-.75.37-.13.56-.09.37.13.53.19.31.13.48.19.37.12.43.19.12.25 0 .49c-.19.3-.78.78-1.06 1.06z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.mapWrapper}>
          <iframe
            title="map"
            src="https://maps.google.com/maps?q=Dubininskaya%20Ulitsa%20%2096%20Moscow%20Russia&z=15&output=embed"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;