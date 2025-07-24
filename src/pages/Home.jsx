import React, { useState, useEffect, useRef } from 'react';
import HeroSection from '../components/HeroSection';
import { FaCalendarCheck, FaListAlt, FaUserFriends, FaUsersCog, FaCreditCard, FaEdit, FaTrash, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import { useEditMode } from '../context/EditModeContext';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
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

export default function Home() {
  const [services, setServices] = useState([]);
  const [modalId, setModalId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const loadedRef = useRef(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/60 to-secondary/80">
      {/* Hero Section */}
      <HeroSection />
      {/* Editable Services Section */}
      <section className="py-20">
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
    </div>
  );
}