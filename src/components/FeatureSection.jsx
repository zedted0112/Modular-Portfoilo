import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaPalette, FaRocket, FaUsers, FaCog, FaLightbulb, FaPlus, FaEdit } from 'react-icons/fa';
import { useEditMode } from '../context/EditModeContext';
import { AnimatePresence } from 'framer-motion';

const defaultFeatures = [
  {
    id: 1,
    icon: <FaCode className="text-3xl" />,
    title: "Modern Development",
    description: "Cutting-edge tools and frameworks for building scalable applications",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    icon: <FaPalette className="text-3xl" />,
    title: "Creative Design",
    description: "Beautiful, intuitive interfaces that enhance user experience",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    icon: <FaRocket className="text-3xl" />,
    title: "Performance Optimization",
    description: "Lightning-fast applications with optimized code and architecture",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 4,
    icon: <FaUsers className="text-3xl" />,
    title: "Team Collaboration",
    description: "Seamless workflows for distributed development teams",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 5,
    icon: <FaCog className="text-3xl" />,
    title: "Custom Solutions",
    description: "Tailored development solutions for your unique requirements",
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: 6,
    icon: <FaLightbulb className="text-3xl" />,
    title: "Innovation Hub",
    description: "Pushing boundaries with cutting-edge technology solutions",
    color: "from-yellow-500 to-orange-500"
  }
];

export default function FeatureSection() {
  const { editMode } = useEditMode();
  const [features, setFeatures] = useState(defaultFeatures);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFeature, setNewFeature] = useState({ title: '', description: '', color: 'from-blue-500 to-cyan-500' });

  const handleAddFeature = () => {
    if (newFeature.title && newFeature.description) {
      const feature = {
        id: Date.now(),
        icon: <FaCode className="text-3xl" />,
        ...newFeature
      };
      setFeatures([...features, feature]);
      setNewFeature({ title: '', description: '', color: 'from-blue-500 to-cyan-500' });
      setShowAddForm(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
                            radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Empowering developers with cutting-edge tools and innovative solutions for the modern web
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="group relative"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-8 h-full transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-2xl group-hover:shadow-accent/20">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Add Feature Button */}
        {editMode && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 hover:scale-105"
            >
              <FaPlus />
              Add Service
            </button>
          </motion.div>
        )}

        {/* Add Feature Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddForm(false)}
            >
              <motion.div
                className="bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-600"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Add New Service</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Service Title"
                    value={newFeature.title}
                    onChange={(e) => setNewFeature({ ...newFeature, title: e.target.value })}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent"
                  />
                  <textarea
                    placeholder="Service Description"
                    value={newFeature.description}
                    onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent min-h-[100px]"
                  />
                  <select
                    value={newFeature.color}
                    onChange={(e) => setNewFeature({ ...newFeature, color: e.target.value })}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-accent"
                  >
                    <option value="from-blue-500 to-cyan-500">Blue</option>
                    <option value="from-purple-500 to-pink-500">Purple</option>
                    <option value="from-orange-500 to-red-500">Orange</option>
                    <option value="from-green-500 to-emerald-500">Green</option>
                    <option value="from-indigo-500 to-purple-500">Indigo</option>
                    <option value="from-yellow-500 to-orange-500">Yellow</option>
                  </select>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleAddFeature}
                    className="flex-1 px-4 py-2 bg-accent text-white rounded-lg hover:bg-secondary transition-colors"
                  >
                    Add Service
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}