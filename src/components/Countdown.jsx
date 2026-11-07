import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Countdown.module.css';

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

const Card = ({ value, label, index }) => (
  <motion.div
    className={styles.card}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
  >
    <span className={styles.value}>{String(value ?? 0).padStart(2, '0')}</span>
    <span className={styles.label}>{label}</span>
  </motion.div>
);

export default function Countdown({ settings }) {
  const time = useCountdown(settings?.weddingDate || '2026-12-05T10:30:00');
  return (
    <section className={styles.section} id="countdown">
      <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        Counting the moments
      </motion.p>
      <motion.h2 className={`section-title ${styles.title}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        Until The Nikkah
      </motion.h2>
      
      <div className="gold-separator"><span className="gold-separator-icon">♦</span></div>
      
      <div className={styles.cards}>
        <Card value={time.days}    label="DAYS"    index={0} />
        <Card value={time.hours}   label="HOURS"   index={1} />
        <Card value={time.minutes} label="MINUTES" index={2} />
        <Card value={time.seconds} label="SECONDS" index={3} />
      </div>

      {/* Bride & Groom photo */}
      <motion.div
        className={styles.coupleImgWrapper}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <img
          src="/images/dreamy_ice_blue_wedding_dance.png"
          alt="Hidha & Irfan"
          className={styles.coupleImg}
        />
      </motion.div>
    </section>
  );
}
