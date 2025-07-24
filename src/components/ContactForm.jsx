// ContactForm.jsx
// Elegant, glassy contact form for DevForge Landing layout.
// Customize your contact info and social links below.
// The form is for demo purposes (no backend by default).
import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope } from 'react-icons/fa';

// TODO: Update your contact/social info here
const SOCIAL_LINKS = [
  { icon: <FaLinkedin />, url: "https://linkedin.com/in/yourprofile", label: "LinkedIn" },
  { icon: <FaGithub />, url: "https://github.com/yourprofile", label: "GitHub" },
  { icon: <FaInstagram />, url: "https://instagram.com/yourprofile", label: "Instagram" },
  { icon: <FaEnvelope />, url: "mailto:your@email.com", label: "Email" }
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setSent(true); // Demo only
  };
  return (
    <section id="contact" className="py-16 px-4 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-lg">
        Get in Touch
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 w-full max-w-xl flex flex-col gap-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="flex-1 p-4 rounded-lg bg-white/30 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="flex-1 p-4 rounded-lg bg-white/30 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        </div>
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          className="p-4 rounded-lg bg-white/30 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent min-h-[120px]"
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-accent text-white font-bold rounded-lg shadow hover:bg-secondary transition-colors"
        >
          {sent ? 'Message Sent!' : 'Send Message'}
        </button>
      </form>
      {/* Social Links */}
      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {SOCIAL_LINKS.map(link => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/90 hover:text-accent text-lg transition-colors"
            aria-label={link.label}
          >
            {link.icon}
            <span className="hidden sm:inline">{link.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
// End ContactForm.jsx
