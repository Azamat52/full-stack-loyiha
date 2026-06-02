import React from 'react'
import { useSelector } from 'react-redux'


function Input({
  type = "text",
  id,
  placeholder,
  value,
  label,
  disabled,
  setState
}) {
  return (
    <div className="floating-input-wrapper">

      <input
        type={type}
        id={id}
        value={value}
        placeholder=" "
        className="floating-input"
        onChange={(e) => setState(e.target.value)}
        disabled={disabled}
      />

      <label
        htmlFor={id}
        className="floating-label"
      >
        {label}
      </label>

    </div>
  )
}

export default Input