import '../styles/globals.css';
import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';

export default function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage if available
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
  }, []);

  // Update className on body when dark mode changes
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode); // Save preference to localStorage
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div>
      <NavBar toggleDarkMode={toggleDarkMode} /> {/* Pass toggleDarkMode as a prop */}
      <button onClick={toggleDarkMode} style={{ margin: '10px' }}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <Component {...pageProps} />
    </div>
  );
}
