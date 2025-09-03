import React, { useState, useEffect, useRef, useMemo } from 'react';
import HeroSection from '../components/HeroSection';
import { FaCalendarCheck, FaListAlt, FaUserFriends, FaUsersCog, FaCreditCard, FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaRegImage } from 'react-icons/fa';
import { useEditMode } from '../context/EditModeContext';
import { useTheme } from '../context/ThemeContext';
import { FastAverageColor } from 'fast-average-color';
// Remove: import Vibrant from 'node-vibrant/lib/browser';

const ICONS = [
  { icon: <FaCalendarCheck />, name: 'Calendar' },
  { icon: <FaListAlt />, name: 'List' },
  { icon: <FaUserFriends />, name: 'Users' },
  { icon: <FaUsersCog />, name: 'Staff' },
  { icon: <FaCreditCard />, name: 'Card' },
];

const LOCAL_STORAGE_KEY = 'editableServices';

const defaultServices = [
  {
    id: 1,
    icon: 0,
    title: 'Appointment Booking',
    desc: 'Seamless scheduling for your clients. Book, manage, and track appointments with ease.'
  },
  {
    id: 2,
    icon: 1,
    title: 'Service Catalog',
    desc: 'Showcase your offerings with style. Organize and present your services beautifully.'
  },
  {
    id: 3,
    icon: 2,
    title: 'Customer Profiles',
    desc: 'Manage and understand your audience. Keep track of customer details and preferences.'
  },
  {
    id: 4,
    icon: 3,
    title: 'Staff Management',
    desc: 'Organize your team efficiently. Assign roles, track performance, and more.'
  },
  {
    id: 5,
    icon: 4,
    title: 'Payment Integration',
    desc: 'Secure and easy payment solutions. Accept payments and manage transactions.'
  }
];

function ServiceCard({ service, onOpen }) {
  return (
    <div
      className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center text-left border border-white/20 transition-transform hover:scale-105 hover:shadow-2xl group w-full max-w-3xl mx-auto mb-8 cursor-pointer"
      onClick={onOpen}
      tabIndex={0}
      role="button"
      aria-label={`Open details for ${service.title}`}
    >
      <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-accent/80 to-secondary/80 shadow-lg text-4xl text-white mr-0 md:mr-8 mb-6 md:mb-0">
        {ICONS[service.icon]?.icon}
      </div>
      <div className="flex-1">
        <h3 className="text-3xl font-bold text-white mb-2 drop-shadow">{service.title}</h3>
        <p className="text-white/80 mb-2 text-lg line-clamp-2">{service.desc}</p>
      </div>
    </div>
  );
}

function ServiceModal({ service, onClose, onEdit, onDelete, editing, onSave, onCancel }) {
  const [form, setForm] = useState(service);
  const { editMode } = useEditMode();
  useEffect(() => { setForm(service); }, [service]);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onMouseDown={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 w-full max-w-2xl flex flex-col gap-6 border border-white/30 animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <button type="button" onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-red-400 text-2xl" title="Close"><FaTimes /></button>
        <div className="flex items-center gap-6 mb-4">
          <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-accent/80 to-secondary/80 shadow-lg text-5xl text-white">
            {ICONS[service.icon]?.icon}
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-white mb-2 drop-shadow">{service.title}</h2>
            <p className="text-white/80 text-lg">{service.desc}</p>
          </div>
        </div>
        {!editing && editMode && (
          <div className="flex gap-2 justify-end mt-2">
            <button onClick={onEdit} className="p-2 bg-yellow-400/70 hover:bg-yellow-500 text-white rounded-full shadow transition-colors text-lg" title="Edit"><FaEdit /></button>
            <button onClick={onDelete} className="p-2 bg-red-500/70 hover:bg-red-600 text-white rounded-full shadow transition-colors text-lg" title="Delete"><FaTrash /></button>
          </div>
        )}
        {editing && (
          <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="flex flex-col gap-6">
            <label className="text-white font-semibold">Icon</label>
            <div className="flex gap-4 mb-2">
              {ICONS.map((ic, idx) => (
                <button key={ic.name} type="button" onClick={() => setForm({ ...form, icon: idx })} className={`text-3xl p-2 rounded-full border-2 ${form.icon === idx ? 'border-accent bg-white/30' : 'border-transparent'} transition`}>{ic.icon}</button>
              ))}
            </div>
            <input
              type="text"
              name="title"
              placeholder="Service Title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="p-3 rounded-xl border-none bg-white/60 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent text-lg shadow"
              required
            />
            <textarea
              name="desc"
              placeholder="Service Description"
              value={form.desc}
              onChange={e => setForm({ ...form, desc: e.target.value })}
              className="p-3 rounded-xl border-none bg-white/60 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent text-lg shadow min-h-[80px]"
              required
            />
            <div className="flex gap-4 justify-end mt-2">
              <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow transition-colors text-lg"><FaSave /> Save</button>
              <button type="button" onClick={onCancel} className="flex items-center gap-2 px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-full shadow transition-colors text-lg"><FaTimes /> Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function ThemeTab({ onSelectTheme, theme, themeImages, onSave, pendingBg, setPendingBg }) {
  const [showBgPicker, setShowBgPicker] = useState(false);
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
  const images = useThemeBackgrounds(theme);
  return (
    <div className="fixed top-24 right-4 bg-black/70 backdrop-blur-xl rounded-2xl shadow-2xl p-6 z-50 flex flex-col gap-4 w-80 border border-gray-700">
      <h3 className="font-bold text-xl mb-2 text-white">Theme Picker</h3>
      <div className="flex flex-col gap-4">
        {Object.entries(themeImages).map(([key, img]) => (
          <button
            key={key}
            className={`relative w-full h-28 rounded-xl overflow-hidden shadow-lg border-2 transition-all flex items-end group ${theme === key ? 'border-accent ring-2 ring-accent' : 'border-transparent'}`}
            onClick={() => onSelectTheme(key)}
            style={{ background: '#222' }}
          >
            <img src={img} alt={key} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
            <span className="relative z-10 text-white text-lg font-bold px-4 pb-3 drop-shadow-lg">
              {key === 'purpleHaze' ? 'Purple Haze' : key === 'greenGlass' ? 'Green Glass' : key}
            </span>
            {theme === key && (
              <span className="absolute top-2 right-2 bg-accent text-white rounded-full p-1 shadow-lg">
                ✔️
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="flex gap-3 mt-4 w-full justify-between">
        <button
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-2xl shadow transition"
          onClick={() => setShowBgPicker(true)}
          title="Change Background"
        >
          <FaRegImage />
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold text-lg shadow-lg transition"
          onClick={onSave}
        >
          <FaSave /> Save
        </button>
      </div>
      {/* Working Background Picker Modal (gallery) as a child of the theme picker modal */}
      {showBgPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowBgPicker(false)}>
          <div
            className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 flex gap-4 flex-wrap max-w-2xl border border-gray-200 dark:border-gray-700"
            onClick={e => e.stopPropagation()}
          >
            {images.map(img => (
              <button
                key={img}
                className={`rounded-lg overflow-hidden border-4 ${pendingBg === img ? 'border-accent' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-accent`}
                onClick={() => { setPendingBg(img); setShowBgPicker(false); }}
                title={pendingBg === img ? 'Current Background' : 'Set as Background'}
              >
                <img src={img} alt="bg option" className="w-32 h-20 object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [services, setServices] = useState([]);
  const [modalId, setModalId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const loadedRef = useRef(false);
  const { editMode } = useEditMode();
  const { theme, setTheme, colorMode, setColorMode } = useTheme();

  // New: local state for pending theme and bg
  const [pendingTheme, setPendingTheme] = useState(theme);
  const [pendingBg, setPendingBg] = useState(null);
  const [showBgPicker, setShowBgPicker] = useState(false);
  const [showThemeTab, setShowThemeTab] = useState(false);
  const [servicesBg, setServicesBg] = useState('');

  // Sync pendingTheme with global theme when theme changes
  useEffect(() => {
    setPendingTheme(theme);
  }, [theme]);

  // Save handler: update global theme and colorMode
  const handleThemeSave = () => {
    setTheme(pendingTheme);
    // Optionally, save pendingBg to localStorage if you want to persist bg selection
    if (pendingBg) {
      localStorage.setItem(`heroBg_${pendingTheme}`, pendingBg);
    }
    setShowThemeTab(false);
    setShowBgPicker(false);
  };

  useEffect(() => {
    if (!loadedRef.current) {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      console.log('[Services] Loaded from localStorage:', saved);
      setServices(saved ? JSON.parse(saved) : defaultServices);
      loadedRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (loadedRef.current) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(services));
      console.log('[Services] Saved to localStorage:', services);
    }
  }, [services]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    async function extractGradient() {
      if (pendingTheme === 'purpleHaze') {
        // Use the first purple image as the source
        const imgSrc = useThemeBackgrounds('purpleHaze')[0];
        if (!imgSrc || !window.Vibrant) return;
        try {
          // Get palette color
          const palette = await window.Vibrant.from(imgSrc).getPalette();
          const paletteColor = palette.Muted?.getHex() || palette.DarkVibrant?.getHex() || '#a78bfa';
          // Get average color
          const fac = new FastAverageColor();
          const avgColorObj = await fac.getColorAsync(imgSrc);
          const avgColor = avgColorObj.hex || '#6d28d9';
          setServicesBg(`linear-gradient(135deg, ${paletteColor} 0%, ${avgColor} 100%)`);
        } catch (e) {
          setServicesBg('');
        }
      } else {
        setServicesBg('');
      }
    }
    extractGradient();
  }, [pendingTheme]);

  const handleOpen = id => setModalId(id);
  const handleClose = () => { setModalId(null); setEditingId(null); };
  const handleEdit = id => setEditingId(id);
  const handleDelete = id => {
    setServices(services.filter(s => s.id !== id));
    handleClose();
  };
  const handleSave = updated => {
    if (editingId) {
      setServices(services.map(s => (s.id === editingId ? { ...updated, id: editingId } : s)));
      setEditingId(null);
    } else {
      setServices([
        ...services,
        { ...updated, id: Date.now() }
      ]);
      setAdding(false);
    }
    handleClose();
  };
  const handleCancel = () => setEditingId(null);

  // Get preview images for each theme
  const themeImages = {
    purpleHaze: useThemeBackgrounds('purpleHaze')[0],
    greenGlass: useThemeBackgrounds('greenGlass')[0],
  };

  // Determine which background image to use
  const savedBg = useMemo(() => {
    return localStorage.getItem(`heroBg_${pendingTheme}`);
  }, [pendingTheme]);
  const bgImage = pendingBg || savedBg;

  return (
    <>
      {/* Theme Tab Toggle Button - only show when editMode is on */}
      {editMode && (
        <button
          className="fixed top-20 right-6 z-40 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 rounded-full p-2 shadow hover:scale-110 transition"
          onClick={() => setShowThemeTab(v => !v)}
          title="Choose Theme"
        >
          🎨
        </button>
      )}
      {editMode && showThemeTab && (
        <ThemeTab
          onSelectTheme={setPendingTheme}
          theme={pendingTheme}
          themeImages={themeImages}
          onSave={handleThemeSave}
          pendingBg={pendingBg}
          setPendingBg={setPendingBg}
        />
      )}
      {/* Render HeroSection normally */}
      <HeroSection
        theme={pendingTheme}
        bgPickerOpen={false}
        setPendingBg={setPendingBg}
        pendingBg={pendingBg}
        editMode={editMode}
      />
      {/* Editable Services Section */}
      <section
        className="py-20"
        style={pendingTheme === 'purpleHaze' && servicesBg ? { background: servicesBg } : {}}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-4">
            <h2 className="text-4xl font-extrabold text-white text-center md:text-left mb-4 md:mb-0 drop-shadow-lg">Our Services</h2>
            <button
              onClick={() => setAdding(true)}
              className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-secondary text-white font-bold rounded-full shadow-lg transition-colors text-lg"
              disabled={adding}
            >
              <FaPlus /> Add Service
            </button>
          </div>
          <div className="flex flex-col gap-6 items-center">
            {adding && (
              <ServiceModal
                service={{ icon: 0, title: '', desc: '' }}
                onClose={() => setAdding(false)}
                onEdit={() => {}}
                onDelete={() => setAdding(false)}
                editing={true}
                onSave={service => {
                  setServices([
                    ...services,
                    { ...service, id: Date.now() }
                  ]);
                  setAdding(false);
                }}
                onCancel={() => setAdding(false)}
              />
            )}
            {services.map(service => (
              <React.Fragment key={service.id}>
                <ServiceCard
                  service={service}
                  onOpen={() => handleOpen(service.id)}
                />
                {modalId === service.id && (
                  <ServiceModal
                    service={service}
                    onClose={handleClose}
                    onEdit={() => handleEdit(service.id)}
                    onDelete={() => handleDelete(service.id)}
                    editing={editingId === service.id}
                    onSave={handleSave}
                    onCancel={handleCancel}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
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