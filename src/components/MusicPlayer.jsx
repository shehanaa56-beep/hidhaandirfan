import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiVolume2, FiVolumeX } from 'react-icons/fi';
import styles from './MusicPlayer.module.css';

export default function MusicPlayer({ audioRef }) {
  const [playing, setPlaying] = useState(() => {
    if (audioRef?.current) {
      return !audioRef.current.paused;
    }
    return true;
  });
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [volume, setVolume] = useState(0.6);

  const togglePlay = () => {
    if (!audioRef?.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!audioRef?.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef?.current) audioRef.current.volume = v;
  };

  return (
    <motion.div
      className={styles.player}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
    >
      <motion.div className={styles.mainBtn} onClick={() => setExpanded(!expanded)}>
        <div className={styles.disc} style={{ animationPlayState: playing ? 'running' : 'paused' }}>
          <div className={styles.discInner} />
        </div>
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className={styles.controls}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <button className={styles.controlBtn} onClick={togglePlay} title={playing ? 'Pause' : 'Play'}>
              {playing ? <FiPause /> : <FiPlay />}
            </button>
            <button className={styles.controlBtn} onClick={toggleMute} title={muted ? 'Unmute' : 'Mute'}>
              {muted ? <FiVolumeX /> : <FiVolume2 />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
