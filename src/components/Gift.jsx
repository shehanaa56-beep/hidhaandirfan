import { motion } from 'framer-motion';
import styles from './Gift.module.css';

export default function Gift({ settings }) {
  return (
    <section className={styles.section} id="gift">
      <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        With Gratitude
      </motion.p>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        Wedding Gift
      </motion.h2>
      
      <div className="gold-separator"><span className="gold-separator-icon">♦</span></div>

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className={styles.note}>
          Your presence is the greatest gift. Should you wish to bless us further:
        </p>
        <div className={styles.details}>
          <p><span>Account:</span> {settings?.bankAccount || 'Hidha'}</p>
          <p><span>Bank:</span> {settings?.bankName || ''}</p>
          <p><span>A/C No:</span> {settings?.bankACNo || ''}</p>
          <p><span>UPI:</span> {settings?.upiId || ''}</p>
        </div>
      </motion.div>
    </section>
  );
}
