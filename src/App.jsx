import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ArtCollection from './pages/ArtCollection';
import Contact from './pages/Contact';
import { EditModeProvider } from './context/EditModeContext';
import Footer from './components/Footer';

function App() {
  return (
    <EditModeProvider>
      <Router>
        <div className="App">
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
  );
}

export default App;