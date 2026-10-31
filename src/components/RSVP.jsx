import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitRSVP } from '../services/firebase';
import styles from './RSVP.module.css';

export default function RSVP() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '1',
    attending: 'Yes, I Will Attend',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await submitRSVP(form);
      setStatus('success');
      setForm({
        name: '',
        phone: '',
        email: '',
        guests: '1',
        attending: 'Yes, I Will Attend',
        message: '',
      });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className={styles.section} id="rsvp">
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Will You Join Us?
      </motion.h2>

      <div className={styles.separator}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={styles.separatorSvg}>
          <path d="M12 2C12 2 9.5 5 9.5 8C9.5 11 12 11.5 12 11.5C12 11.5 14.5 11 14.5 8C14.5 5 12 2 12 2Z" />
          <path d="M12 22C12 22 9.5 19 9.5 16C9.5 13 12 12.5 12 12.5C12 12.5 14.5 13 14.5 16C14.5 19 12 22 12 22Z" />
          <path d="M2 12C2 12 5 9.5 8 9.5C11 9.5 11.5 12 11.5 12C11.5 12 11 14.5 8 14.5C5 14.5 2 12 2 12Z" />
          <path d="M22 12C22 12 19 9.5 16 9.5C13 9.5 12.5 12 12.5 12C12.5 12 13 14.5 16 14.5C19 14.5 22 12 22 12Z" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </div>

      <motion.form
        className={styles.form}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >

        {/* Attend card options */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Will you be with us?</label>
          <div className={styles.attendCards}>
            <label className={`${styles.attendCard} ${form.attending === 'Yes, I Will Attend' ? styles.attendCardActive : ''}`}>
              <input
                type="radio"
                name="attending"
                value="Yes, I Will Attend"
                checked={form.attending === 'Yes, I Will Attend'}
                onChange={e => update('attending', e.target.value)}
                className={styles.radioInput}
              />
              <span className={styles.attendRadio} />
              <span className={styles.attendText}>Yes, I will be there!</span>
            </label>
            <label className={`${styles.attendCard} ${form.attending === 'Sorry, I Cannot Attend' ? styles.attendCardActive : ''}`}>
              <input
                type="radio"
                name="attending"
                value="Sorry, I Cannot Attend"
                checked={form.attending === 'Sorry, I Cannot Attend'}
                onChange={e => update('attending', e.target.value)}
                className={styles.radioInput}
              />
              <span className={styles.attendRadio} />
              <span className={styles.attendText}>No, but there in spirit.</span>
            </label>
          </div>
        </div>


        {status === 'success' && <p className={styles.success}>Thank you! We have received your response.</p>}
        {status === 'error' && <p className={styles.error}>Something went wrong. Please try again.</p>}

        <motion.button
          id="rsvp-submit"
          type="submit"
          className={styles.submitBtn}
          disabled={status === 'loading'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {status === 'loading' ? 'SENDING...' : 'SEND RESPONSE'}
        </motion.button>
      </motion.form>
    </section>
  );
}
