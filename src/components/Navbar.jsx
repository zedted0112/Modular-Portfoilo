// Navbar.jsx
// Enhanced responsive navigation bar with improved UX patterns
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaEdit, FaCheck, FaBars, FaTimes } from 'react-icons/fa';
import { useEditMode } from '../context/EditModeContext';
import { useTheme } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

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
    <motion.nav 
      className={`w-full flex items-center justify-between px-6 md:px-8 py-4 ${gradientClass} backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-white/10 transition-all duration-300 ${
        isScrolled ? 'py-3 shadow-xl' : 'py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/" className={`text-2xl md:text-3xl font-extrabold tracking-wide drop-shadow-lg ${textClass} transition-all duration-300`}>
          {LOGO}
        </Link>
      </motion.div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex space-x-8">
        {NAV_LINKS.map((link, index) => (
          <motion.div
            key={link.name}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              to={link.path}
              className={`${linkClass} font-medium transition-all duration-300 relative group ${
                location.pathname === link.path ? 'text-accent font-semibold' : ''
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full ${
                location.pathname === link.path ? 'w-full' : ''
              }`} />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Desktop Social Links & Toggles */}
      <div className="hidden md:flex space-x-4 items-center">
        {SOCIAL_LINKS.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkClass} text-xl transition-all duration-300 hover:scale-110`}
            aria-label={link.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            {link.icon}
          </motion.a>
        ))}
        
        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className="ml-2 p-2 rounded-full border-2 border-white/30 bg-white/10 text-accent hover:bg-accent hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent hover:scale-110"
          title={colorMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle dark mode"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {colorMode === 'dark' ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-blue-400" />}
        </motion.button>
        
        {/* Edit Mode Toggle */}
        <motion.button
          onClick={() => setEditMode(e => !e)}
          className={`ml-2 p-2 rounded-full border-2 transition-all duration-300 ${
            editMode ? 'border-accent bg-accent text-white' : 'border-white/30 bg-white/10 text-accent hover:bg-accent hover:text-white'
          }`}
          title={editMode ? 'Exit Edit Mode' : 'Enable Edit Mode'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {editMode ? <FaCheck /> : <FaEdit />}
        </motion.button>
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        className="md:hidden p-2 rounded-lg border border-white/30 bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        whileTap={{ scale: 0.9 }}
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-b border-white/10 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 space-y-4">
              {/* Mobile Nav Links */}
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`block ${linkClass} font-medium text-lg py-2 transition-all duration-300 ${
                      location.pathname === link.path ? 'text-accent font-semibold' : ''
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile Social Links */}
              <div className="flex justify-center space-x-6 pt-4 border-t border-white/20">
                {SOCIAL_LINKS.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} text-2xl transition-all duration-300 hover:scale-110`}
                    aria-label={link.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
