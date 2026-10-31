import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Share.module.css';

export default function Share({ settings }) {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;
  const bride = settings?.brideName || 'Hidha';
  const groom = settings?.groomName || 'Irfan';
  const msg = `You're invited to ${bride} & ${groom}'s Nikkah ceremony! ${url}`;

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareButtons = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(msg)}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { label: 'Instagram', href: 'https://www.instagram.com' },
  ];

  return (
    <section className={styles.section} id="share">
      <motion.h2 className={`section-title ${styles.title}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        Share The Joy
      </motion.h2>
      
      <div className="gold-separator"><span className="gold-separator-icon">♦</span></div>
      
      <div className={styles.btns}>
        {shareButtons.map((b) => (
          <motion.a
            key={b.label}
            href={b.href}
            target="_blank"
            rel="noreferrer"
            className={styles.shareBtn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {b.label}
          </motion.a>
        ))}
        <motion.button
          className={`${styles.shareBtn} ${styles.copyBtn}`}
          onClick={copyLink}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {copied ? 'COPIED!' : 'COPY LINK'}
        </motion.button>
      </div>
    </section>
  );
}
