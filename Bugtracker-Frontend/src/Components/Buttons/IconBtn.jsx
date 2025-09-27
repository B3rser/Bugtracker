import React from 'react'
import './Buttons.css'

export function IconBtn({ children, onClick, variant = 'primary'}) {
  return (
    <button
      className={`icon-btn ${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}