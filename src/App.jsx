import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ArtCollection from './pages/ArtCollection';
import Contact from './pages/Contact';
import { EditModeProvider } from './context/EditModeContext';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  // No theme logic here; all handled in ThemeProvider and Home.jsx
  let gradientClass = 'min-h-screen bg-gradient-to-br from-primary to-secondary dark:from-darkPrimary dark:to-darkSecondary transition-colors duration-500';

  return (
    <ThemeProvider>
      <EditModeProvider>
        <Router>
          <div className={`App ${gradientClass}`}>
            <Navbar />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/artcollection" element={<ArtCollection />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </EditModeProvider>
    </ThemeProvider>
  );
}

export default App;