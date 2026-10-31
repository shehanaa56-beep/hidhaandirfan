import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';
import styles from './ContactFloating.module.css';

export default function ContactFloating({ settings }) {
  const [open, setOpen] = useState(false);
  const wa = settings?.contactWhatsapp || '+919876543210';
  const phone = settings?.contactPhone || '+919876543210';
  const email = settings?.contactEmail || 'aaliya.ibrahim@wedding.com';

  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {open && (
          <>
            <motion.a
              href={`https://wa.me/${wa.replace(/\D/g,'')}`}
              target="_blank" rel="noreferrer"
              className={`${styles.btn} ${styles.wa}`}
              title="WhatsApp"
              initial={{ scale: 0, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, y: 20, opacity: 0 }}
              transition={{ delay: 0.05 }}
            >
              <FaWhatsapp />
            </motion.a>
            <motion.a
              href={`tel:${phone}`}
              className={`${styles.btn} ${styles.call}`}
              title="Call"
              initial={{ scale: 0, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0, y: 20, opacity: 0 }}
              transition={{ delay: 0 }}
            >
              <FaPhone />
            </motion.a>
          </>
        )}
      </AnimatePresence>
      <motion.button
        className={`${styles.btn} ${styles.toggle}`}
        onClick={() => setOpen(o => !o)}
        whileTap={{ scale: 0.9 }}
        title="Contact"
      >
        <FaEnvelope />
      </motion.button>
    </div>
  );
}
