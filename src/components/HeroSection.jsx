// HeroSection.jsx
// This is the animated, glassy hero section for the DevForge Landing layout.
// Customize the headline, subheadline, and call-to-action below.
// You can also adjust the animation and glassmorphism styles as needed.
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit } from 'react-icons/fa';
import { useEditMode } from '../context/EditModeContext';

const LS_KEY = 'heroEditable';
const defaultHero = {
  title: 'DevForge',
  tagline: 'Modern Modular Tooling for Developers',
  button: 'Get in Touch',
  code: [
    "console.log('Hello, welcome to DevForge!');",
    "console.log('Built by Nitin with Ryo');"
  ]
};

function useTypewriter(text, speed = 40) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
}

function useMultiCodeTypewriter(messages, speed = 18, pause = 1200) {
  const [displayed, setDisplayed] = useState('');
  const [msgIdx, setMsgIdx] = useState(0);
  useEffect(() => {
    let i = 0;
    let timeout;
    setDisplayed('');
    function type() {
      if (i <= messages[msgIdx].length) {
        setDisplayed(messages[msgIdx].slice(0, i));
        i++;
        timeout = setTimeout(type, speed);
      } else {
        timeout = setTimeout(() => {
          setDisplayed('');
          i = 0;
          setMsgIdx(idx => (idx + 1) % messages.length);
        }, pause);
      }
    }
    type();
    return () => clearTimeout(timeout);
  }, [messages, msgIdx, speed, pause]);
  return displayed;
}

function EditableText({ value, onSave, className, inputClass, editMode, as = 'input', ...props }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  useEffect(() => { setVal(value); }, [value]);
  if (!editMode) return <span className={className}>{value}</span>;
  return (
    <span className={`relative group ${className}`}
      onMouseEnter={() => { if (!editing) setVal(value); }}>
      {editing ? (
        as === 'textarea' ? (
          <textarea
            className={inputClass}
            value={val}
            autoFocus
            onChange={e => setVal(e.target.value)}
            onBlur={() => { setEditing(false); onSave(val); }}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); setEditing(false); onSave(val); } }}
            {...props}
          />
        ) : (
          <input
            className={inputClass}
            value={val}
            autoFocus
            onChange={e => setVal(e.target.value)}
            onBlur={() => { setEditing(false); onSave(val); }}
            onKeyDown={e => { if (e.key === 'Enter') { setEditing(false); onSave(val); } }}
            {...props}
          />
        )
      ) : (
        <>
          {value}
          <button
            type="button"
            className="absolute -top-2 -right-7 opacity-0 group-hover:opacity-100 p-1 text-accent bg-white/80 rounded-full shadow transition"
            style={{ fontSize: 16 }}
            onClick={() => setEditing(true)}
            tabIndex={-1}
          >
            <FaEdit />
          </button>
        </>
      )}
    </span>
  );
}

// SVG wave path generator (sine wave)
function Wave({ color, duration, delay, amplitude = 12, frequency = 1, opacity = 0.18, reverse = false }) {
  const width = 1440, height = 120, points = 60;
  let d = `M 0 ${height / 2}`;
  for (let i = 0; i <= points; i++) {
    const x = (width / points) * i;
    const y = height / 2 + Math.sin((i / points) * Math.PI * 2 * frequency) * amplitude;
    d += ` L ${x} ${y}`;
  }
  d += ` L ${width} ${height} L 0 ${height} Z`;
  return (
    <motion.svg
      className="absolute left-0 w-full"
      style={{ bottom: reverse ? 'auto' : 0, top: reverse ? 0 : 'auto', opacity, zIndex: 0 }}
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      initial={{ x: reverse ? '-30vw' : '30vw' }}
      animate={{ x: reverse ? '30vw' : '-30vw' }}
      transition={{ repeat: Infinity, repeatType: 'mirror', duration, delay, ease: 'linear' }}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={color} x1="0" y1="0" x2={width} y2={height} gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <path d={d} fill={`url(#${color})`} />
    </motion.svg>
  );
}

// Helper to dynamically import all images for a theme
function useThemeBackgrounds(theme) {
  return useMemo(() => {
    if (theme === 'purpleHaze') {
      return Object.values(import.meta.glob('../assets/backgrounds/purple/*.png', { eager: true, import: 'default' }));
    } else if (theme === 'greenGlass') {
      return Object.values(import.meta.glob('../assets/backgrounds/green/*.png', { eager: true, import: 'default' }));
    }
    return [];
  }, [theme]);
}

export default function HeroSection({ theme, pendingBg, setPendingBg, editMode }) {
  const images = useThemeBackgrounds(theme);
  useEffect(() => {
    console.log('[HeroSection] theme:', theme);
    console.log('[HeroSection] images:', images);
  }, [theme, images]);
  // For purpleHaze, always use the first purple image
  const [selectedBg, setSelectedBg] = useState(() => {
    if (theme === 'purpleHaze') {
      return images[0] || null;
    }
    if (pendingBg && images.includes(pendingBg)) return pendingBg;
    const saved = localStorage.getItem(`heroBg_${theme}`);
    return (saved && images.includes(saved)) ? saved : images[0] || null;
  });
  useEffect(() => {
    if (theme === 'purpleHaze') {
      setSelectedBg(images[0] || null);
      return;
    }
    if (pendingBg && images.includes(pendingBg)) {
      setSelectedBg(pendingBg);
    }
  }, [pendingBg, images, theme]);
  useEffect(() => {
    if (selectedBg && theme !== 'purpleHaze') localStorage.setItem(`heroBg_${theme}`, selectedBg);
  }, [selectedBg, theme]);
  useEffect(() => {
    console.log('[HeroSection] selectedBg:', selectedBg);
  }, [selectedBg]);
  const [showPicker, setShowPicker] = useState(false);
  const [hero, setHero] = useState(defaultHero);

  // Load/save hero edits
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setHero(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(hero));
  }, [hero]);

  // Update selectedBg if theme or images change, but only if the saved value is valid and different
  useEffect(() => {
    const saved = localStorage.getItem(`heroBg_${theme}`);
    if (saved && images.includes(saved) && saved !== selectedBg) {
      setSelectedBg(saved);
    } else if (!saved && images[0] && selectedBg !== images[0]) {
      setSelectedBg(images[0]);
    }
    // else do nothing (prevents flicker)
    // eslint-disable-next-line
  }, [theme, images]);

  useEffect(() => {
    if (pendingBg && images.includes(pendingBg)) {
      setSelectedBg(pendingBg);
    }
  }, [pendingBg, images]);
  useEffect(() => {
    if (selectedBg) localStorage.setItem(`heroBg_${theme}`, selectedBg);
  }, [selectedBg, theme]);

  const typedTagline = useTypewriter(hero.tagline, 30);
  const typedCode = useMultiCodeTypewriter(hero.code, 14, 1200);

  // Determine gradient classes based on theme
  let gradientClass = 'bg-gradient-to-br from-primary to-secondary dark:from-darkPrimary dark:to-darkSecondary';
  if (theme === 'purpleHaze') {
    gradientClass = 'bg-gradient-to-br from-purpleHazeLightFrom to-purpleHazeLightTo dark:from-purpleHazeDarkFrom dark:to-purpleHazeDarkTo';
  } else if (theme === 'greenGlass') {
    gradientClass = 'bg-gradient-to-br from-greenGlassLightFrom to-greenGlassLightTo dark:from-greenGlassDarkFrom dark:to-greenGlassDarkTo';
  }

  // Only update background if a new image is selected
  const handleSelectBg = (img) => {
    if (img !== selectedBg) {
      setSelectedBg(img);
    }
    setShowPicker(false);
  };

  return (
    <section className={`relative min-h-[70vh] w-full flex flex-col items-center justify-center text-center ${gradientClass} overflow-hidden`}>
      {/* Animated Background Image */}
      <AnimatePresence mode="wait">
        {selectedBg && (
          <motion.img
            key={selectedBg}
            src={selectedBg}
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ pointerEvents: 'none' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/20 z-10" />
      {/* Subtle animated frequency waves */}
      <Wave color="wave1" duration={18} delay={0} amplitude={14} frequency={1} opacity={0.16} />
      <Wave color="wave2" duration={24} delay={2} amplitude={8} frequency={2} opacity={0.12} reverse />
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-lg z-20" />
      {/* Picker logic only for greenGlass */}
      {theme === 'greenGlass' && editMode && images.length > 1 && (
        <button
          className="fixed bottom-8 right-8 z-40 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 rounded-full p-3 shadow hover:scale-110 transition"
          onClick={() => setShowPicker(v => !v)}
          title="Change Background"
        >
          <span role="img" aria-label="Change Background">🖼️</span>
        </button>
      )}
      {/* Picker Modal only for greenGlass */}
      <AnimatePresence>
        {theme === 'greenGlass' && editMode && showPicker && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPicker(false)}
          >
            <div
              className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 flex gap-4 flex-wrap max-w-2xl border border-gray-200 dark:border-gray-700"
              onClick={e => e.stopPropagation()}
            >
              {images.map(img => (
                <button
                  key={img}
                  className={`rounded-lg overflow-hidden border-4 ${selectedBg === img ? 'border-accent' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-accent`}
                  onClick={() => handleSelectBg(img)}
                  title={selectedBg === img ? 'Current Background' : 'Set as Background'}
                >
                  <img src={img} alt="bg option" className="w-32 h-20 object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="relative z-30 p-8 flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg">
          <EditableText
            value={hero.title}
            onSave={val => setHero(h => ({ ...h, title: val }))}
            className="inline-block"
            inputClass="text-5xl md:text-7xl font-extrabold text-black bg-white/80 rounded px-2"
            editMode={editMode}
          />
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-accent mb-4 min-h-[2.5em]">
          <EditableText
            value={hero.tagline}
            onSave={val => setHero(h => ({ ...h, tagline: val }))}
            className="inline-block"
            inputClass="text-2xl md:text-4xl font-semibold text-black bg-white/80 rounded px-2"
            editMode={editMode}
          />
          <span className="inline-block w-2 h-6 bg-accent ml-1 animate-pulse align-middle rounded"></span>
        </h2>
        <p className="text-lg md:text-xl text-white/80 mb-8">
          Powered by Ryo-Cli
        </p>
        {/* Call to Action Button */}
        <a
          href="#contact"
          className="inline-block px-8 py-3 bg-accent text-white font-bold rounded-full shadow-lg hover:bg-secondary transition-colors ml-4"
        >
          {hero.button}
        </a>
        {/* Animated code snippet overlay */}
        <div className="mt-12 flex justify-center w-full group">
          <motion.pre
            className="bg-black/70 text-green-400 text-left rounded-xl p-6 shadow-2xl font-mono text-base md:text-lg max-w-xl border border-white/10 animate-fade-in whitespace-pre-line break-words relative"
            style={{ height: '140px', width: '420px', maxWidth: '100%', transition: 'none', overflowX: 'auto' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            {editMode && (
              <button
                type="button"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 text-accent bg-white/80 rounded-full shadow transition"
                style={{ fontSize: 16, zIndex: 10 }}
                onClick={() => {
                  const newCode = prompt('Edit code (use \\n for new lines):', hero.code.join('\n'));
                  if (newCode !== null) setHero(h => ({ ...h, code: newCode.split('\n') }));
                }}
                tabIndex={-1}
              >
                <FaEdit />
              </button>
            )}
            {typedCode}
            <span className="inline-block w-2 h-6 bg-green-400 ml-1 animate-pulse align-middle rounded" style={{verticalAlign: 'middle'}}></span>
          </motion.pre>
        </div>
      </motion.div>
    </section>
  );
}
