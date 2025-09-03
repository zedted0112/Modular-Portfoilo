// Navbar.jsx
// Responsive navigation bar for DevForge Landing layout.
// Customize your logo, nav links, and social/contact links below.
// All URLs are in the NAV_LINKS array for easy editing.
import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaEdit, FaCheck } from 'react-icons/fa';
import { useEditMode } from '../context/EditModeContext';
import { useTheme } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

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

export default function Navbar({ theme }) {
  const { editMode, setEditMode } = useEditMode();
  const { theme: colorMode, toggleTheme } = useTheme();

  // Determine gradient classes based on theme
  let gradientClass = 'bg-gradient-to-r from-primary/80 to-secondary/80 dark:from-darkPrimary/80 dark:to-darkSecondary/80';
  let textClass = 'text-white';
  let linkClass = 'text-white/90 hover:text-accent';
  if (theme === 'purpleHaze') {
    gradientClass = 'bg-gradient-to-r from-purpleHazeLightFrom/80 to-purpleHazeLightTo/80 dark:from-purpleHazeDarkFrom/80 dark:to-purpleHazeDarkTo/80';
    textClass = 'text-white';
    linkClass = 'text-white/90 hover:text-yellow-200';
  } else if (theme === 'greenGlass') {
    gradientClass = 'bg-gradient-to-r from-greenGlassLightFrom/80 to-greenGlassLightTo/80 dark:from-greenGlassDarkFrom/80 dark:to-greenGlassDarkTo/80';
    textClass = 'text-white';
    linkClass = 'text-white/90 hover:text-green-200';
  }

  return (
    <nav className={`w-full flex items-center justify-between px-8 py-4 ${gradientClass} backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-white/10`}>
      {/* Logo */}
      <Link to="/" className={`text-2xl md:text-3xl font-extrabold tracking-wide drop-shadow-lg ${textClass}`}>
        {LOGO}
      </Link>
      {/* Nav Links */}
      <div className="hidden md:flex space-x-8">
        {NAV_LINKS.map(link => (
          <Link
            key={link.name}
            to={link.path}
            className={`${linkClass} font-medium transition-colors`}
          >
            {link.name}
          </Link>
        ))}
      </div>
      {/* Social Links & Toggles */}
      <div className="flex space-x-4 items-center">
        {SOCIAL_LINKS.map(link => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} text-xl transition-colors`}
            aria-label={link.label}
          >
            {link.icon}
          </a>
        ))}
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="ml-2 p-2 rounded-full border-2 border-white/30 bg-white/10 text-accent hover:bg-accent hover:text-white transition focus:outline-none focus:ring-2 focus:ring-accent"
          title={colorMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle dark mode"
        >
          {colorMode === 'dark' ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-blue-400" />}
        </button>
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
