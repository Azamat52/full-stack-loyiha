import React from 'react'

function TextArea({
  id,
  value,
  label,
  disabled,
  setState
}) {
  return (
    <div className="floating-textarea-wrapper">

      <textarea
        id={id}
        disabled={disabled}
        value={value}
        placeholder=" "
        className="floating-textarea"
        onChange={(e) => setState(e.target.value)}
      ></textarea>

      <label
        htmlFor={id}
        className="floating-textarea-label"
      >
        {label}
      </label>

    </div>
  )
}

export default TextArea