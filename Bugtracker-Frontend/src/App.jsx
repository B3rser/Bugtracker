import React from 'react'
import './App.css'
import { Home } from './Pages/Home'
import { Toast } from './Components/Toast';

function App() {
  const [toast, setToast] = React.useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  return (
    <>
      <div className='toast-container'>
        {toast && (<Toast type={toast.type}
          message={toast.message}
          onClose={handleCloseToast} />)}
      </div>
      <Home showToast={showToast} />
    </>
  )
}

export default App
