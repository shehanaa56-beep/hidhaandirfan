import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { getWishes, submitWish } from '../services/firebase';
import styles from './Wishes.module.css';

// 4 Elegant vector illustrations for the polaroid photo slots
const VectorDoodles = [
  // 1. Delicate flower stem
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M12 22C12 22 12 15 11 12C10 9 7 9 7 9C7 9 10 8 11 5C11.5 3.5 12.5 3.5 13 5C14 8 17 9 17 9C17 9 14 9 13 12C12 15 12 22 12 22Z" />
    <circle cx="12" cy="5" r="1" fill="currentColor" />
  </svg>,
  // 2. Interlocking luxury wedding bands
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="9.5" cy="12" r="4.5" />
    <circle cx="14.5" cy="12" r="4.5" />
    <circle cx="12" cy="9.5" r="1" fill="currentColor" />
  </svg>,
  // 3. Double hearts outline
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M11.5 8.5C9.5 6.5 6.5 6.5 4.5 8.5C2.5 10.5 2.5 13.5 4.5 15.5L11.5 21L12.5 20L8.5 16" />
    <path d="M12.5 8.5C14.5 6.5 17.5 6.5 19.5 8.5C21.5 10.5 21.5 13.5 19.5 15.5L12.5 21.5L8.5 17.5C7.5 16.5 7.5 14.5 8.5 13.5C9.5 12.5 11.5 12.5 12.5 13.5" />
  </svg>,
  // 4. Swaying botanical leaf branch
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M6 18C12 18 15 13 17 9C18 7 19.5 5 21 3" />
    <path d="M11 15C9.5 13 8 13 8 13C8 13 9.5 11.5 11.5 12.5" />
    <path d="M15 11.5C14 9.5 12.5 9.5 12.5 9.5C12.5 9.5 14 8 15.5 9" />
    <path d="M18.5 8C17.5 6.5 16.5 6.5 16.5 6.5C16.5 6.5 18 5 19 6" />
  </svg>
];

export default function Wishes() {
  const [wishes, setWishes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', message: '' });
  const boardRef = useRef(null);

  // Load wishes on mount
  useEffect(() => {
    getWishes().then(data => {
      // Map loaded wishes and assign random, responsive position metrics
      const positioned = data.map((wish, index) => ({
        ...wish,
        left: `${Math.random() * 58 + 6}%`, // 6% to 64% bounds
        top: `${Math.random() * 45 + 8}%`,  // 8% to 53% bounds
        rotate: Math.random() * 16 - 8,      // -8deg to +8deg
        doodleIndex: index % VectorDoodles.length
      }));
      setWishes(positioned);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    const newWishData = {
      name: form.name,
      message: form.message,
    };

    try {
      await submitWish(newWishData);
      
      // Push new wish directly into state with random placement so it pops up immediately
      const newWish = {
        ...newWishData,
        id: Date.now().toString(),
        left: `${Math.random() * 58 + 6}%`,
        top: `${Math.random() * 45 + 8}%`,
        rotate: Math.random() * 16 - 8,
        doodleIndex: Math.floor(Math.random() * VectorDoodles.length)
      };

      setWishes(prev => [newWish, ...prev]);
      setForm({ name: '', message: '' });
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to submit wish", err);
    }
  };

  return (
    <section className={styles.section} id="wishes">
      <motion.p 
        className="section-subtitle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Blessings
      </motion.p>
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        Wishes Corner
      </motion.h2>
      
      <div className="gold-separator">
        <span className="gold-separator-icon">♦</span>
      </div>

      <p className={styles.introText}>
        Leave a warm blessing for the happy couple and drag the Polaroid cards around the board!
      </p>

      {/* Wishes Board */}
      <div className={styles.board} ref={boardRef}>
        {loading ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>✧</span>
            <p>Gathering warm wishes...</p>
          </div>
        ) : wishes.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>✉</span>
            <p>No wishes yet. Be the first to leave a message!</p>
          </div>
        ) : (
          wishes.map((wish) => (
            <motion.div
              key={wish.id}
              className={styles.polaroid}
              style={{
                left: wish.left,
                top: wish.top,
                rotate: wish.rotate,
              }}
              drag
              dragConstraints={boardRef}
              dragElastic={0.05}
              whileDrag={{ scale: 1.06, rotate: 0, zIndex: 100 }}
              whileHover={{ scale: 1.03, zIndex: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Wax seal pin decoration */}
              <div className={styles.waxPin} />

              {/* Photo Area with Line Art Doodle */}
              <div className={styles.imageArea}>
                {VectorDoodles[wish.doodleIndex ?? 0]}
              </div>

              {/* Wish Message */}
              <p className={styles.message}>
                "{wish.message}"
              </p>

              {/* Signer */}
              <div className={styles.signer}>
                {wish.name}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Button to Open Add Wish Modal */}
      <div className={styles.btnWrap}>
        <button 
          onClick={() => setModalOpen(true)}
          className="btn-gold"
          style={{ padding: '10px 28px', fontSize: '0.85rem' }}
        >
          Write a Blessing ✧
        </button>
      </div>

      {/* Glassmorphic Wish Input Modal Overlay */}
      {modalOpen && (
        <div className={styles.modalOverlay} onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <motion.div 
            className={styles.modalContent}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <button className={styles.closeBtn} onClick={() => setModalOpen(false)}>✕</button>
            <h3 className={styles.modalTitle}>Leave a Blessing</h3>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div>
                <label className={styles.label}>Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                  className={styles.input}
                  maxLength={25}
                />
              </div>

              <div>
                <label className={styles.label}>Your Wish</label>
                <textarea
                  placeholder="May your love grow stronger each day..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  required
                  className={styles.textarea}
                  rows={3}
                  maxLength={100}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Share Blessing
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
}
