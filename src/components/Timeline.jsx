import { motion } from 'framer-motion';
import styles from './Timeline.module.css';

const timelineEvents = [
  {
    date: 'JUNE 2022',
    title: 'First Meeting',
    desc: 'A glance, a smile, and the world quietly shifted.',
    image: '/images/wedding_stage.png',
    side: 'left',
  },
  {
    date: 'FEBRUARY 2025',
    title: 'Engagement',
    desc: 'A ring, a promise, and forever began to bloom.',
    image: '/images/wedding_rings.png',
    side: 'right',
  },
  {
    date: 'DECEMBER 2026',
    title: 'Wedding',
    desc: 'Two souls woven into one, beneath a canopy of roses.',
    image: '/images/wedding_stage.png',
    side: 'left',
  },
];

const TimelineItem = ({ event }) => {
  const isLeft = event.side === 'left';
  return (
    <div className={`${styles.item} ${isLeft ? styles.left : styles.right}`}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
      >
        <img src={event.image} alt={event.title} className={styles.image} />
        <div className={styles.content}>
          <span className={styles.date}>{event.date}</span>
          <h3 className={styles.title}>{event.title}</h3>
          <p className={styles.desc}>{event.desc}</p>
        </div>
      </motion.div>
      <motion.div
        className={styles.dot}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />
    </div>
  );
};

export default function Timeline() {
  return (
    <section className={`${styles.section} floral-corner-tl`} id="timeline">
      <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        Our Journey
      </motion.p>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        Love Story
      </motion.h2>
      <div className="heart-separator"><span className="heart-icon">♦</span></div>
      <div className={styles.timeline}>
        <div className={styles.line} />
        {timelineEvents.map((ev, i) => <TimelineItem key={i} event={ev} />)}
      </div>
    </section>
  );
}
