import { createContext, useContext, useState } from "react";

// Create context
const ProfileContext = createContext();

// Create provider
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook
export const useProfile = () => useContext(ProfileContext);
