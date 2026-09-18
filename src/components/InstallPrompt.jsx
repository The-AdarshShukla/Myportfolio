import React, { useState, useEffect } from 'react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPopup(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('App Installed Successfully');
    }
    
    setDeferredPrompt(null);
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div style={popupStyle}>
      <p style={{ margin: 0, fontWeight: '500' }}>
        📱 Install Adarsh Portfolio App on your Home Screen!
      </p>
      <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
        <button onClick={handleInstallClick} style={installBtnStyle}>
          Add to Home Screen
        </button>
        <button onClick={() => setShowPopup(false)} style={dismissBtnStyle}>
          Later
        </button>
      </div>
    </div>
  );
};

// Styling
const popupStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: '#111827',
  color: '#ffffff',
  padding: '16px 20px',
  borderRadius: '12px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
  border: '1px solid #00ffcc',
  zIndex: 9999,
  maxWidth: '320px',
};

const installBtnStyle = {
  backgroundColor: '#00ffcc',
  color: '#000000',
  border: 'none',
  padding: '8px 14px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const dismissBtnStyle = {
  backgroundColor: 'transparent',
  color: '#9ca3af',
  border: '1px solid #374151',
  padding: '8px 12px',
  borderRadius: '6px',
  cursor: 'pointer',
};

export default InstallPrompt;