import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';
import { getRSVPs, getSettings, updateSettings } from '../services/firebase';
import styles from './Admin.module.css';

const ADMIN_PASS = 'wedding2026';

export default function Admin() {
  const [authed, setAuthed]       = useState(false);
  const [pass, setPass]           = useState('');
  const [tab, setTab]             = useState('rsvps');
  const [rsvps, setRsvps]         = useState([]);
  const [settings, setSettings]   = useState(null);
  const [saving, setSaving]       = useState(false);
  const [saveMsg, setSaveMsg]     = useState('');

  const login = () => { if (pass === ADMIN_PASS) setAuthed(true); };

  useEffect(() => {
    if (!authed) return;
    getRSVPs().then(setRsvps);
    getSettings().then(setSettings);
  }, [authed]);

  const exportXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(rsvps.map(r => ({
      Name: r.name, Phone: r.phone, Email: r.email,
      Guests: r.guests, Attending: r.attending,
      Message: r.message, Date: r.submittedAt,
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'RSVPs');
    XLSX.writeFile(wb, 'wedding-rsvps.xlsx');
  };

  const saveSetting = async (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    setSaving(true);
    await updateSettings({ [key]: value });
    setSaving(false);
    setSaveMsg('Saved ✓');
    setTimeout(() => setSaveMsg(''), 2000);
  };

  if (!authed) return (
    <div className={styles.loginWrap}>
      <div className={styles.loginCard}>
        <h1 className={styles.loginTitle}>Admin Panel</h1>
        <p className={styles.loginSub}>Enter your admin password</p>
        <input
          type="password" value={pass}
          onChange={e => setPass(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          placeholder="Password"
          className={styles.loginInput}
        />
        <button className={`btn-gold ${styles.loginBtn}`} onClick={login}>Login</button>
      </div>
    </div>
  );

  return (
    <div className={styles.admin}>
      <div className={styles.sidebar}>
        <h2 className={styles.logo}>Admin ❄️</h2>
        {['rsvps', 'settings'].map(t => (
          <button
            key={t}
            className={`${styles.navBtn} ${tab === t ? styles.active : ''}`}
            onClick={() => setTab(t)}
          >
            {t === 'rsvps' ? '📋 RSVPs' : '⚙️ Settings'}
          </button>
        ))}
        <a href="/" className={styles.navBtn}>← Back to Site</a>
      </div>

      <div className={styles.content}>
        {tab === 'rsvps' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className={styles.header}>
              <h2>RSVP Responses ({rsvps.length})</h2>
              <button className="btn-gold" onClick={exportXLSX}>Export to Excel</button>
            </div>
            {rsvps.length === 0
              ? <p className={styles.empty}>No RSVPs yet.</p>
              : (
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Name</th><th>Phone</th><th>Email</th>
                        <th>Guests</th><th>Attending</th><th>Message</th><th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rsvps.map((r, i) => (
                        <tr key={r.id || i}>
                          <td>{r.name}</td><td>{r.phone}</td><td>{r.email}</td>
                          <td>{r.guests}</td>
                          <td className={r.attending === 'Joyfully Accept' ? styles.accept : styles.decline}>{r.attending}</td>
                          <td>{r.message}</td>
                          <td>{r.submittedAt ? new Date(r.submittedAt).toLocaleDateString() : ''}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
          </motion.div>
        )}

        {tab === 'settings' && settings && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.settingsGrid}>
            <h2>Wedding Settings {saving && <span className={styles.saving}>Saving…</span>}{saveMsg && <span className={styles.saved}>{saveMsg}</span>}</h2>
            {[
              ['brideName', 'Bride Name'],
              ['groomName', 'Groom Name'],
              ['weddingDate', 'Wedding Date & Time'],
              ['brideParents', 'Bride Parents'],
              ['groomParents', 'Groom Parents'],
              ['venue', 'Venue Name'],
              ['venueAddress', 'Venue Address'],
              ['bankAccount', 'Bank Account Name'],
              ['bankName', 'Bank Name'],
              ['bankACNo', 'Account Number'],
              ['upiId', 'UPI ID'],
              ['contactWhatsapp', 'WhatsApp Number'],
            ].map(([key, label]) => (
              <div key={key} className={styles.field}>
                <label className={styles.label}>{label}</label>
                <input
                  type={key === 'weddingDate' ? 'datetime-local' : 'text'}
                  value={settings[key] || ''}
                  onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))}
                  onBlur={e => saveSetting(key, e.target.value)}
                  className={styles.input}
                />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
