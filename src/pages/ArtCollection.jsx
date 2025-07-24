import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaExternalLinkAlt, FaEdit, FaTrash, FaSave, FaTimes, FaPlus } from 'react-icons/fa';
import { useEditMode } from '../context/EditModeContext';

const LOCAL_STORAGE_KEY = 'portfolioProjects';

const defaultProjects = [
  {
    id: 1,
    title: 'Sample Project',
    description: 'This is a sample project. Click edit to customize!',
    image: '',
    github: '',
    linkedin: '',
    demo: ''
  }
];

const placeholderImg =
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80';

function ProjectCard({ project, onEdit, onDelete, editMode }) {
  return (
    <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-6 flex flex-col items-center transition-transform hover:-translate-y-1 hover:shadow-2xl border border-white/20 group">
      <div className="w-full h-40 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
        <img
          src={project.image || placeholderImg}
          alt={project.title}
          className="object-cover w-full h-full"
        />
      </div>
      <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-lg text-center w-full truncate">{project.title}</h3>
      <p className="text-white/80 mb-4 text-center w-full min-h-[48px]">{project.description}</p>
      <div className="flex gap-4 mb-4">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent text-2xl transition-colors" title="GitHub"><FaGithub /></a>
        )}
        {project.linkedin && (
          <a href={project.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent text-2xl transition-colors" title="LinkedIn"><FaLinkedin /></a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent text-2xl transition-colors" title="Live Demo"><FaExternalLinkAlt /></a>
        )}
      </div>
      {editMode && (
        <div className="flex gap-2 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button onClick={onEdit} className="p-2 bg-yellow-400/80 hover:bg-yellow-500 text-white rounded-full shadow transition-colors" title="Edit"><FaEdit /></button>
          <button onClick={onDelete} className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full shadow transition-colors" title="Delete"><FaTrash /></button>
        </div>
      )}
    </div>
  );
}

function ProjectForm({ project, onSave, onCancel }) {
  const [form, setForm] = useState(project);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form onSubmit={handleSubmit} className="relative bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 w-full max-w-lg flex flex-col gap-6 border border-white/30 animate-fade-in">
        <button type="button" onClick={onCancel} className="absolute top-4 right-4 text-white/80 hover:text-red-400 text-2xl" title="Cancel"><FaTimes /></button>
        <h2 className="text-2xl font-bold text-white mb-2 text-center drop-shadow">{project.id ? 'Edit Project' : 'Add Project'}</h2>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          className="p-3 rounded-xl border-none bg-white/60 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent text-lg shadow"
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={form.description}
          onChange={handleChange}
          className="p-3 rounded-xl border-none bg-white/60 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent text-lg shadow min-h-[80px]"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={handleChange}
          className="p-3 rounded-xl border-none bg-white/60 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent text-lg shadow"
        />
        <input
          type="text"
          name="github"
          placeholder="GitHub Link (optional)"
          value={form.github}
          onChange={handleChange}
          className="p-3 rounded-xl border-none bg-white/60 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent text-lg shadow"
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn Link (optional)"
          value={form.linkedin}
          onChange={handleChange}
          className="p-3 rounded-xl border-none bg-white/60 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent text-lg shadow"
        />
        <input
          type="text"
          name="demo"
          placeholder="Demo Link (optional)"
          value={form.demo}
          onChange={handleChange}
          className="p-3 rounded-xl border-none bg-white/60 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent text-lg shadow"
        />
        <div className="flex gap-4 justify-center mt-2">
          <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow transition-colors text-lg"><FaSave /> Save</button>
          <button type="button" onClick={onCancel} className="flex items-center gap-2 px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-full shadow transition-colors text-lg"><FaTimes /> Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default function ArtCollection() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const { editMode } = useEditMode();

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    setProjects(saved ? JSON.parse(saved) : defaultProjects);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const handleEdit = id => setEditingId(id);
  const handleDelete = id => setProjects(projects.filter(p => p.id !== id));
  const handleSave = updated => {
    if (editingId) {
      setProjects(projects.map(p => (p.id === editingId ? { ...updated, id: editingId } : p)));
      setEditingId(null);
    } else {
      setProjects([
        ...projects,
        { ...updated, id: Date.now() }
      ]);
      setAdding(false);
    }
  };
  const handleCancel = () => {
    setEditingId(null);
    setAdding(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/60 to-secondary/80 py-16 px-2">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-4">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg text-center md:text-left">Portfolio Projects</h1>
          {editMode && (
            <div className="flex gap-4 items-center justify-center md:justify-end">
              <button
                onClick={() => setAdding(true)}
                className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-secondary text-white font-bold rounded-full shadow-lg transition-colors text-lg"
                disabled={adding}
              >
                <FaPlus /> Add Project
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {adding && (
            <ProjectForm
              project={{ title: '', description: '', image: '', github: '', linkedin: '', demo: '' }}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
          {projects.map(project =>
            editingId === project.id ? (
              <ProjectForm
                key={project.id}
                project={project}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={editMode ? () => handleEdit(project.id) : undefined}
                onDelete={editMode ? () => handleDelete(project.id) : undefined}
                editMode={editMode}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}