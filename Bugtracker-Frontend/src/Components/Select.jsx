import React from 'react'

export function Select({ name = "", label = "", value, onChange, options = [], readOnly = false }) {
  return (
    <div className="select-container">
      <label htmlFor={label}>{label}</label>
      <select id={label} className="select" name={name} value={value} onChange={onChange} disabled={readOnly}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
