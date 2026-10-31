import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer({ settings }) {
  const date = new Date(settings?.weddingDate || '2026-12-05T11:30:00');
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  
  return (
    <motion.footer
      className={styles.footer}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <p className={styles.names}>{settings?.brideName || 'Hidha'} &amp; {settings?.groomName || 'Irfan'}</p>
      <p className={styles.date}>{d} · {m} · {y}</p>
      <p className={styles.made}>Designed with elegance ✧</p>
    </motion.footer>
  );
}
