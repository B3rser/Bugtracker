import React from 'react'
import './Buttons.css';

export function Button({ children, variant = 'primary', onClick, disabled, type="button"}) {
  return (
    <button
      className={`btn ${variant}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}