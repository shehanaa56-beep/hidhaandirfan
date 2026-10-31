import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Envelope from './components/Envelope';
import Curtains from './components/Curtains';
import Hero from './components/Hero';
import Countdown from './components/Countdown';

import Events from './components/Events';
import Venue from './components/Venue';
import Family from './components/Family';
import RSVP from './components/RSVP';
import Share from './components/Share';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import Admin from './components/Admin';

import Wishes from './components/Wishes';
import { getSettings } from './services/firebase';

function InvitationPage() {
  const [searchParams] = useSearchParams();
  const guestName = searchParams.get('guest');

  const [opened, setOpened] = useState(false);
  const [settings, setSettings] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    getSettings().then(setSettings);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleOpen = (audio) => {
    audioRef.current = audio;
    setTimeout(() => setOpened(true), 400);
  };

  return (
    <div style={{ position: 'relative' }}>
      <AnimatePresence>
        {!opened && <Envelope onOpen={handleOpen} />}
      </AnimatePresence>

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            <Curtains />
            <Hero settings={settings} guestName={guestName} />
            <Countdown settings={settings} />
            <Family settings={settings} />

            <Events settings={settings} />
            <Venue settings={settings} />
            <Share settings={settings} />

            <Wishes />
            <RSVP />
            <Footer settings={settings} />
            <MusicPlayer audioRef={audioRef} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<InvitationPage />} />
        <Route path="/invitation" element={<InvitationPage />} />
        <Route path="/admin"      element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
