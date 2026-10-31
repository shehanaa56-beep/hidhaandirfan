import { motion } from 'framer-motion';
import styles from './Venue.module.css';

export default function Venue({ settings }) {
  const venue = settings?.venue || 'JB Lawns Auditorium';
  const address = settings?.venueAddress || 'Valanchery - Nilambur Road, Puthanangadi, Kerala';
  const mapsUrl = settings?.venueMapsUrl || 'https://maps.app.goo.gl/kU1DaaKoNcvSTHYY9?g_st=iw';
  const directionsUrl = settings?.venueMapsUrl || 'https://maps.app.goo.gl/kU1DaaKoNcvSTHYY9?g_st=iw';
  const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`;

  return (
    <section className={styles.section} id="venue">
      <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        The Place
      </motion.p>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        Venue
      </motion.h2>
      
      <div className="gold-separator"><span className="gold-separator-icon">♦</span></div>

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >


        <h3 className={styles.venueName}>{venue}</h3>
        <p className={styles.address}>{address}</p>

        <div className={styles.mapWrap}>
          <iframe
            title="Venue Map"
            src={mapEmbed}
            className={styles.map}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        
        <div className={styles.btns}>
          <a href={mapsUrl} target="_blank" rel="noreferrer" className={`btn-gold ${styles.btn}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Open Maps
          </a>
          <a href={directionsUrl} target="_blank" rel="noreferrer" className={`btn-outline-gold ${styles.btn}`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
            Get Directions
          </a>
        </div>
      </motion.div>
    </section>
  );
}
