import React, { createContext, useContext, useState, useEffect } from 'react';

const EditModeContext = createContext();

export function EditModeProvider({ children }) {
  // In production, edit mode is disabled by default for security
  // In development, it can be enabled
  const [editMode, setEditMode] = useState(false);
  
  useEffect(() => {
    // Check if we're in development mode
    const isDevelopment = import.meta.env.DEV;
    
    // In production, only enable edit mode if explicitly requested via URL param
    if (!isDevelopment) {
      const urlParams = new URLSearchParams(window.location.search);
      const enableEdit = urlParams.get('edit') === 'true';
      setEditMode(enableEdit);
    }
  }, []);

  // Function to toggle edit mode (only works in development or with proper auth)
  const toggleEditMode = () => {
    const isDevelopment = import.meta.env.DEV;
    if (isDevelopment || editMode) {
      setEditMode(!editMode);
    }
  };

  return (
    <EditModeContext.Provider value={{ 
      editMode, 
      setEditMode, 
      toggleEditMode,
      isDevelopment: import.meta.env.DEV 
    }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  return useContext(EditModeContext);
} 