// ContactForm.jsx
// Enhanced elegant contact form with improved UX and modern design
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaPaperPlane, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

// TODO: Update your contact/social info here
const SOCIAL_LINKS = [
  { icon: <FaLinkedin />, url: "https://linkedin.com/in/yourprofile", label: "LinkedIn" },
  { icon: <FaGithub />, url: "https://github.com/yourprofile", label: "GitHub" },
  { icon: <FaInstagram />, url: "https://instagram.com/yourprofile", label: "Instagram" },
  { icon: <FaEnvelope />, url: "mailto:your@email.com", label: "Email" }
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setErrors({});
    
    // Reset success message after 5 seconds
    setTimeout(() => setSent(false), 5000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
                            radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Get in Touch
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Ready to start your next project? Let's discuss how we can bring your vision to life with cutting-edge technology and innovative solutions.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="order-2 lg:order-1"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-700/50"
            >
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full p-4 rounded-xl bg-gray-700/50 border transition-all duration-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-accent'
                    }`}
                    required
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                    >
                      <FaExclamationTriangle className="text-xs" />
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full p-4 rounded-xl bg-gray-700/50 border transition-all duration-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-accent'
                    }`}
                    required
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                    >
                      <FaExclamationTriangle className="text-xs" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project..."
                    value={form.message}
                    onChange={handleChange}
                    className={`w-full p-4 rounded-xl bg-gray-700/50 border transition-all duration-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent min-h-[140px] resize-none ${
                      errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-accent'
                    }`}
                    required
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                    >
                      <FaExclamationTriangle className="text-xs" />
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-accent to-secondary text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-accent/25 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : sent ? (
                    <>
                      <FaCheck />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            variants={itemVariants}
            className="order-1 lg:order-2 space-y-8"
          >
            {/* Contact Info */}
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30">
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
              <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  Ready to transform your ideas into reality? Whether you need a custom web application, 
                  want to optimize your existing platform, or have questions about our development process, 
                  we're here to help.
                </p>
                <p className="leading-relaxed">
                  Our team of experienced developers and designers is passionate about creating 
                  innovative solutions that drive results. Let's discuss your project and explore 
                  how we can bring your vision to life.
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30">
              <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
              <div className="grid grid-cols-2 gap-4">
                {SOCIAL_LINKS.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-xl text-white/90 hover:text-accent hover:bg-gray-700/50 transition-all duration-300 group"
                    whileHover={{ y: -2, scale: 1.02 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </span>
                    <span className="font-medium">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
