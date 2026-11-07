import { motion } from 'framer-motion';
import styles from './Events.module.css';

const defaultEvents = [
  { id: 'nikkah', name: 'Nikkah Ceremony', date: 'Saturday, December 5, 2026', time: '10:30 AM', venue: 'JB Lawns Auditorium, Puthanangadi' },
];

const EventCard = ({ event, index }) => {
  return (
    <motion.div
      className={styles.eventBlock}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
    >
      <p className={styles.eventLabel}>✦ Event ✦</p>
      <h3 className={styles.eventName}>{event.name}</h3>
      <div className={styles.dividerLine} />
      <p className={styles.eventDate}>{event.date}</p>
      <p className={styles.eventTime}>{event.time}</p>
      <div className={styles.dividerDots}>· · ·</div>
      <p className={styles.eventVenue}>{event.venue}</p>
    </motion.div>
  );
};

export default function Events({ settings }) {
  const events = settings?.events?.length ? settings.events : defaultEvents;
  return (
    <section className={styles.section} id="events">
      {/* Quranic verse header */}
      <motion.div
        className={styles.verseBlock}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <p className={styles.verseArabic}>
          وَمِنْ آيَتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
        </p>
        <p className={styles.verseArabic}>
          وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً
        </p>
      </motion.div>

      <div className={styles.verseSeparator} />

      <div className={styles.list}>
        {events.map((ev, i) => <EventCard key={ev.id || i} event={ev} index={i} />)}
      </div>
    </section>
  );
}
