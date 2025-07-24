// Navbar.jsx
// Responsive navigation bar for DevForge Landing layout.
// Customize your logo, nav links, and social/contact links below.
// All URLs are in the NAV_LINKS array for easy editing.
import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaEdit, FaCheck } from 'react-icons/fa';
import { useEditMode } from '../context/EditModeContext';

// TODO: Update your logo text and nav/social links here
const LOGO = "DevForge";
const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Art Collection", path: "/artcollection" },
  { name: "Contact", path: "/contact" }
];
const SOCIAL_LINKS = [
  // Add or remove as needed
  { icon: <FaLinkedin />, url: "https://linkedin.com/in/yourprofile", label: "LinkedIn" },
  { icon: <FaGithub />, url: "https://github.com/yourprofile", label: "GitHub" },
  { icon: <FaInstagram />, url: "https://instagram.com/yourprofile", label: "Instagram" },
  { icon: <FaEnvelope />, url: "mailto:your@email.com", label: "Email" }
];

export default function Navbar() {
  const { editMode, setEditMode } = useEditMode();
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-gradient-to-r from-primary/80 to-secondary/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-white tracking-wide drop-shadow-lg">
        {LOGO}
      </Link>
      {/* Nav Links */}
      <div className="hidden md:flex space-x-8">
        {NAV_LINKS.map(link => (
          <Link
            key={link.name}
            to={link.path}
            className="text-white/90 hover:text-accent font-medium transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>
      {/* Social Links & Edit Mode */}
      <div className="flex space-x-4 items-center">
        {SOCIAL_LINKS.map(link => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-accent text-xl transition-colors"
            aria-label={link.label}
          >
            {link.icon}
          </a>
        ))}
        {/* Edit Mode Toggle */}
        <button
          onClick={() => setEditMode(e => !e)}
          className={`ml-2 p-2 rounded-full border-2 ${editMode ? 'border-accent bg-accent text-white' : 'border-white/30 bg-white/10 text-accent hover:bg-accent hover:text-white'} transition`}
          title={editMode ? 'Exit Edit Mode' : 'Enable Edit Mode'}
        >
          {editMode ? <FaCheck /> : <FaEdit />}
        </button>
      </div>
      {/* Mobile menu (optional: add hamburger menu logic if needed) */}
    </nav>
  );
}
// End Navbar.jsx
