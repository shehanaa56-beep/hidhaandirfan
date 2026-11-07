import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  orderBy,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnnD9k6SIyaSVM9HLz95xqKBZgSsCbxwo",
  authDomain: "invitations-37aa7.firebaseapp.com",
  projectId: "invitations-37aa7",
  storageBucket: "invitations-37aa7.firebasestorage.app",
  messagingSenderId: "792866877699",
  appId: "1:792866877699:web:15dc591608e3f0d3c03936",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── Default Settings ────────────────────────────────────────────────────────

const DEFAULT_SETTINGS = {
  brideName: "Hidha",
  groomName: "Irfan",
  weddingDate: "2026-12-05T10:30:00",
  brideParents: "Sulaikha & Aboobacker",
  groomParents: "Ansar & Fousiya",
  brideTagline: "Daughter of Sulaikha & Aboobacker",
  groomTagline: "Son of Ansar & Fousiya",
  brideSiblings: "",
  groomSiblings: "",
  venue: "JB Lawns Auditorium",
  venueAddress: "Valanchery - Nilambur Road, Puthanangadi, Kerala",
  venueMapsUrl: "https://maps.app.goo.gl/kU1DaaKoNcvSTHYY9?g_st=iw",
  events: [
    { id: "nikkah", name: "Nikkah Ceremony", icon: "heart", date: "Saturday, December 5, 2026", time: "10:30 AM", venue: "JB Lawns Auditorium, Puthanangadi" },
  ],
  bankAccount: "Hidha",
  bankName: "",
  bankACNo: "",
  upiId: "",
  contactWhatsapp: "",
  contactPhone: "",
  contactEmail: "",
};

// ─── RSVP ────────────────────────────────────────────────────────────────────

export async function submitRSVP(data) {
  const record = { ...data, submittedAt: new Date().toISOString() };
  const existing = JSON.parse(localStorage.getItem("rsvps") || "[]");
  existing.push({ id: Date.now().toString(), ...record });
  localStorage.setItem("rsvps", JSON.stringify(existing));
}

export async function getRSVPs() {
  return JSON.parse(localStorage.getItem("rsvps") || "[]");
}

// ─── Wishes ──────────────────────────────────────────────────────────────────

export async function submitWish(data) {
  const record = { ...data, submittedAt: new Date().toISOString() };
  const existing = JSON.parse(localStorage.getItem("wishes") || "[]");
  existing.push({ id: Date.now().toString(), ...record });
  localStorage.setItem("wishes", JSON.stringify(existing));
}

export async function getWishes() {
  const stored = localStorage.getItem("wishes");
  let localWishes = [];
  if (stored) {
    localWishes = JSON.parse(stored);
  } else {
    const defaults = [
      {
        id: "default-1",
        name: "Fathima & Family",
        message: "May your journey together be full of love, laughter, and endless happiness! Congratulations Hidha & Irfan!",
        submittedAt: "2026-06-20T10:00:00.000Z"
      },
      {
        id: "default-2",
        name: "Rahima",
        message: "Wishing you both a lifetime of beautiful memories and strong love. MashaAllah!",
        submittedAt: "2026-06-20T11:00:00.000Z"
      },
      {
        id: "default-3",
        name: "Shahida & Family",
        message: "So thrilled to celebrate your special day! Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fi khair!",
        submittedAt: "2026-06-21T09:00:00.000Z"
      }
    ];
    localStorage.setItem("wishes", JSON.stringify(defaults));
    localWishes = defaults;
  }
  return localWishes.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

// ─── Settings ────────────────────────────────────────────────────────────────

export async function getSettings() {
  let settings = DEFAULT_SETTINGS;
  try {
    const snap = await getDoc(doc(db, "config", "settings"));
    if (snap.exists()) {
      settings = { ...DEFAULT_SETTINGS, ...snap.data() };
    } else {
      const stored = localStorage.getItem("weddingSettings");
      if (stored) settings = { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (err) {
    console.warn("Firestore settings read failed:", err.message);
    const stored = localStorage.getItem("weddingSettings");
    if (stored) settings = { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  }

  // Migrate any old venue/name/event data to the correct Hidha & Irfan details
  const hasOldNames = 
    settings.brideName?.includes("Hiba") || 
    settings.groomName?.includes("Rishan") ||
    settings.brideName?.includes("Aaliya") || 
    settings.groomName?.includes("Ibrahim") ||
    settings.brideName?.includes("Diksha") ||
    settings.groomName?.includes("Rahul");
  const hasOldDate = 
    settings.weddingDate?.includes("2026-07-11") || 
    settings.weddingDate?.includes("2026-12-12") || 
    settings.weddingDate?.includes("12-12");
  const oldVenues = ["Msp Auditorium", "MSP", "Emmu Auditorium", "Grand Pearl Banquet", "The Royal Pearl Palace"];
  const hasOldEvent = settings.events?.some(
    e => e.name === "Wedding" || e.id === "wedding" || e.venue?.includes("Msp")
  );
  const hasOldTime = 
    settings.weddingDate?.includes("11:30") || 
    settings.events?.some(e => e.time?.includes("11:30"));
  if (
    hasOldNames ||
    hasOldDate ||
    hasOldTime ||
    oldVenues.some(v => settings.venue?.includes(v)) ||
    hasOldEvent
  ) {
    settings = { ...settings, ...DEFAULT_SETTINGS };
    // Write corrected data back to Firestore & localStorage permanently
    try {
      await setDoc(doc(db, "config", "settings"), settings, { merge: true });
    } catch (e) {
      console.warn("Failed to migrate settings to Firestore", e);
    }
    try {
      localStorage.setItem("weddingSettings", JSON.stringify(settings));
    } catch (e) {
      console.warn("Failed to migrate settings to localStorage", e);
    }
  }

  return settings;
}

export async function updateSettings(data) {
  try {
    await setDoc(doc(db, "config", "settings"), data, { merge: true });
  } catch (err) {
    console.warn("Firestore settings write failed:", err.message);
    const current = JSON.parse(localStorage.getItem("weddingSettings") || "{}");
    localStorage.setItem("weddingSettings", JSON.stringify({ ...current, ...data }));
  }
}
