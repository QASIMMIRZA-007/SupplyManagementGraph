import { createContext, useContext, useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '../firebaseConfig'; // Adjust the import path accordingly

const FirebaseDataContext = createContext();

export const FirebaseDataProvider = ({ children }) => {
  const [cities, setCities] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesRef = ref(db, 'dev1gf');
        const snapshot = await onValue(citiesRef);
        const cityList = snapshot.val();
        setCities(cityList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCities();
  }, []);

  return (
    <FirebaseDataContext.Provider value={{ cities }}>
      {children}
    </FirebaseDataContext.Provider>
  );
};

export const useFirebaseData = () => {
  const context = useContext(FirebaseDataContext);
  if (!context) {
    throw new Error('useFirebaseData must be used within a FirebaseDataProvider');
  }
  return context;
};
