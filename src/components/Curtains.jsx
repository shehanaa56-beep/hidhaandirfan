import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Curtains.module.css';

export default function Curtains({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // The sequence starts automatically when this component mounts
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 2500); // Wait for the exit animation to finish
    }, 500); // Small delay before opening

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className={styles.curtainWrapper}>
          {/* Chandelier comes down then goes back up */}
          <motion.div 
            className={styles.chandelierContainer}
            initial={{ y: -200 }}
            animate={{ y: 0 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <div className={styles.glow} />
            <img 
              src="https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=400&auto=format&fit=crop" 
              alt="Royal Chandelier" 
              className={styles.chandelier} 
              style={{ objectFit: 'contain', backgroundBlendMode: 'screen', mixBlendMode: 'screen' }}
            />
          </motion.div>

          {/* Left Curtain */}
          <motion.div
            className={styles.curtainLeft}
            initial={{ x: 0, skewX: 0 }}
            exit={{ 
              x: '-100%', 
              skewX: 10,
              transition: { duration: 2, ease: [0.25, 1, 0.5, 1], delay: 0.5 } 
            }}
          />

          {/* Right Curtain */}
          <motion.div
            className={styles.curtainRight}
            initial={{ x: 0, skewX: 0 }}
            exit={{ 
              x: '100%', 
              skewX: -10,
              transition: { duration: 2, ease: [0.25, 1, 0.5, 1], delay: 0.5 } 
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
