import React, { createContext, useContext, useState } from 'react';

const EditModeContext = createContext();

export function EditModeProvider({ children }) {
  const [editMode, setEditMode] = useState(false);
  return (
    <EditModeContext.Provider value={{ editMode, setEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  return useContext(EditModeContext);
} 