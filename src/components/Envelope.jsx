import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Envelope.module.css';

const Particle = ({ x, y, delay }) => (
  <motion.div
    className={styles.particle}
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: [0, -20] }}
    transition={{ duration: 3, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

const particles = Array.from({ length: 30 }, (_, i) => ({
  x: Math.random() * 100, y: Math.random() * 100, delay: Math.random() * 4,
}));

export default function Envelope({ onOpen }) {
  const [phase, setPhase] = useState('idle'); // idle | breaking | opening | sliding | done
  const audioRef = useRef(null);

  useEffect(() => {
    // You can replace this with a royal orchestral track
    audioRef.current = new Audio('/music/background.mp3'); 
    audioRef.current.loop = true;
    audioRef.current.volume = 0;
  }, []);

  const handleSealClick = async () => {
    if (phase !== 'idle') return;
    setPhase('breaking');

    // Start audio
    try {
      await audioRef.current.play();
      let vol = 0;
      const fade = setInterval(() => {
        vol = Math.min(vol + 0.05, 0.8);
        audioRef.current.volume = vol;
        if (vol >= 0.8) clearInterval(fade);
      }, 200);
    } catch (error) {
      console.error('Audio playback blocked by browser:', error);
    }

    setTimeout(() => setPhase('opening'), 800);
    setTimeout(() => setPhase('sliding'), 1600);
    setTimeout(() => {
      setPhase('done');
      onOpen(audioRef.current);
    }, 3200);
  };

  return (
    <div className={styles.wrapper}>
      {/* Corner Ornaments */}
      <div className={styles.cornerTopLeft} />
      <div className={styles.cornerTopRight} />
      <div className={styles.cornerBottomLeft} />
      <div className={styles.cornerBottomRight} />

      {/* Background particles */}
      {particles.map((p, i) => <Particle key={i} {...p} />)}

      {/* Islamic header */}
      <motion.div
        className={styles.bismillah}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <p className={styles.bismillahArabic}>بسم الله الرحمن الرحيم</p>
        <p className={styles.bismillahEnglish}>In the Name of Allah</p>
      </motion.div>

      {/* Envelope */}
      <AnimatePresence>
        {phase !== 'done' && (
          <motion.div
            className={styles.envelopeContainer}
            animate={
              phase === 'idle' ? { y: [0, -8, 0] } :
              (phase === 'opening' || phase === 'sliding') ? { y: 40, scale: 1.1 } : {}
            }
            transition={
              phase === 'idle'
                ? { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.8, ease: "backOut" }
            }
            exit={{ scale: 3, opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
          >
            {/* Card sliding out */}
            <motion.div 
              className={styles.cardInside}
              initial={{ y: 0 }}
              animate={phase === 'sliding' ? { y: -150 } : { y: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
               <div className={styles.cardArch}></div>
            </motion.div>

            {/* Envelope body */}
            <div className={styles.envelope}>
              {/* Back flap */}
              <motion.div
                className={styles.flap}
                animate={(phase === 'opening' || phase === 'sliding') ? { rotateX: -180 } : { rotateX: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{ transformOrigin: "top", backfaceVisibility: "hidden" }}
              />

              {/* Envelope front decoration lines */}
              <div className={styles.envLeft} />
              <div className={styles.envRight} />
              <div className={styles.envBottom} />

              {/* Wax Seal & Calligraphy */}
              <AnimatePresence>
                {(phase === 'idle' || phase === 'breaking') && (
                  <motion.div
                    className={`${styles.sealWrap} ${phase === 'breaking' ? styles.sealBreaking : ''}`}
                    style={{ x: "-50%", y: "-50%" }}
                    whileHover={phase === 'idle' ? { scale: 1.02 } : {}}
                    whileTap={phase === 'idle' ? { scale: 0.98 } : {}}
                    onClick={handleSealClick}
                    animate={phase === 'breaking' ? { scale: [1, 1.3, 0], opacity: [1, 1, 0] } : {}}
                    transition={{ duration: 0.6 }}
                    exit={{ opacity: 0, scale: 0 }}
                  >
                    <div className={styles.seal}></div>
                    <div className={styles.calligraphyOverlay}>
                      <img 
                        src="/images/bismillah-calligraphy.svg" 
                        alt="Bismillah" 
                        className={styles.calligraphySvg} 
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sparkles on open */}
            {(phase === 'opening' || phase === 'sliding') && (
              <div className={styles.sparkles}>
                {Array.from({ length: 15 }, (_, i) => (
                  <motion.div
                    key={i}
                    className={styles.sparkle}
                    initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                    animate={{ 
                      scale: [0, 1.5, 0], 
                      opacity: [1, 1, 0], 
                      x: [0, Math.cos(i * 24 * Math.PI / 180) * 100], 
                      y: [0, Math.sin(i * 24 * Math.PI / 180) * 100] 
                    }}
                    transition={{ duration: 1.2, delay: i * 0.05 }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tap to open hint */}
      <AnimatePresence>
        {phase === 'idle' && (
          <motion.p
            className={styles.tapHint}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
            exit={{ opacity: 0 }}
          >
            Tap to open
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
