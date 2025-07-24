import React from 'react';
import ContactForm from '../components/ContactForm';

const PROFILE_PHOTO = '/profile-photo.jpg'; // Place your photo in public/profile-photo.jpg or update the path

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/60 to-secondary/80 py-16 px-2 flex items-center justify-center">
      <div className="w-full max-w-2xl flex flex-col items-center">
        <img
          src={PROFILE_PHOTO}
          alt="Your professional headshot"
          className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white/30 mb-8"
          onError={e => { e.target.src = 'https://randomuser.me/api/portraits/men/32.jpg'; }} // fallback placeholder
        />
        <ContactForm />
      </div>
    </div>
  );
}