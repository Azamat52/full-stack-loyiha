import React from 'react'


function Input({
  type = "text",
  id,
  placeholder,
  value,
  label,
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